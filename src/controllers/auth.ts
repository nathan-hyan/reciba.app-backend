import createError from "../middleware/createError";
import User, { UserSchema } from "../models/user";
import JWT, { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, response, Response } from "express";
import { verify } from "hcaptcha";
import { CustomRequest } from "../constants/types";
import emailHandler from "./email";

interface JWTToken {
  exp: string;
}

function prepareUserForConfirmation(userId: string, email: string) {
  const {sendConfirmationEmail} = new emailHandler();
  const TOKEN = JWT.sign({id: userId}, process.env.TOKEN as Secret, {expiresIn: 900});

  sendConfirmationEmail(TOKEN, email)  

  console.log(TOKEN)
}

export default class user {
  /**
   * Checks if the salted password entered by the user
   * matches with the one on the database
   *
   * @param password Password entered by user
   * @param email Email of the user to compare with
   */

  private async isValidPassword(email: string, password: string) {
    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      throw Error("No user found");
    } else {
      return await bcrypt.compare(password, dbUser.password);
    }
  }

  /**
   * Checks if the entered email already
   * exists on database
   *
   * @param email Email to check
   * @returns true | false
   */

  public async createUser(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    if (!req.body.token) {
      createError(next, "No captcha assigned");
    }

    const exist = await User.findOne({ email: req.body.email });

    if (exist) {
      createError(next, "Email already exists");
    } else {
      try {
        const { success } = await verify(
          process.env.CAPTCHASECRET as string,
          req.body.token
        );

        if (success) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
          });

          prepareUserForConfirmation(newUser._id, newUser.email)
          
          try {
            await newUser.save();
            res.send({ success: true, message: "User created" });
          } catch (error) {
            createError(next, error.message);
          }
        } else {
          createError(next, `Token error`);
        }
      } catch (e) {
        createError(next, `Token error ${e.message}`);
      }
    }
  }

  public async login(req: CustomRequest, res: Response): Promise<Response> {
    // Check if user exist
    const doesUserExist = await User.findOne({ email: req.body.email });

     if (!doesUserExist) {


      return res
        .status(401)
        .send({ success: false, message: `Email or password incorrect` });
    } else if (!doesUserExist.confirmed){
      prepareUserForConfirmation(doesUserExist._id, doesUserExist.email)
      return res.send({success: true, confirmed: false})
    } else {
      // Check for valid password
      const validPassword = await bcrypt.compare(
        req.body.password,
        doesUserExist.password
      );



      if (!validPassword) {
        console.log("Password is invalid")
        return res
          .status(401)
          .send({ success: false, message: `Email or password incorrect` });
      } else {
        const token = JWT.sign({ id: doesUserExist._id}, process.env.TOKEN as string, {
          expiresIn: process.env.TOKEN_TIME,
        });
        res.header("auth", token);
        await User.findOneAndUpdate(
          { _id: doesUserExist._id },
          { lastLogin: new Date().toString() }
        );
        res.send({
          success: true,
          confirmed: true,
          message: `Welcome back ${doesUserExist.name}`,
          data: { name: doesUserExist.name, token },
        });
      }
    }

    return res;

  }

  public async checkForLoggedInUser(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    {
      let userExist: UserSchema | null;

      try {
        userExist = await User.findOne({ _id: req.user.id });
      } catch (err) {
        userExist = null;
        createError(next, "Session expired, please, log in again");
      }

      if (userExist) {
        try {
          const verifiedToken = JWT.verify(
            req.body.storedToken,
            process.env.TOKEN as string
          ) as JWTToken;
          const currentDate = Date.now().toString().substring(0, 10);

          if (currentDate > verifiedToken.exp){
            return res.status(401).send({
              success: false,
              message: "Invalid user, please log in",
            });
          } else {
            const token = JWT.sign(
              { id: userExist._id },
              process.env.TOKEN as string,
              {
                expiresIn: process.env.TOKEN_TIME,
              }
            );
            await User.findOneAndUpdate(
              { _id: userExist._id },
              { lastLogin: new Date().toString() }
            );
            res.send({
              success: true,
              message: `Welcome back ${userExist.name}`,
              data: { name: userExist.name, token },
            });
          }
        } catch (err) {
          return res.status(401).send({
            success: false,
            message: "Invalid user, please log in",
          });
        }
      } else {
        return res.status(401).send({
          success: false,
          message: "Invalid user, please log in",
        })}

        return response;
    }
  }

  public async confirmUser(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    const {token} = req.body;
    let jwtResponse: {id: string}

    try{
      jwtResponse = JWT.verify(token, process.env.TOKEN as Secret) as {id: string};
      User.findOneAndUpdate({_id: jwtResponse.id}, {confirmed: true})
      .then(() => {
        res.send({success: true, message: 'User successfully confirmed'})
      })
      .catch((err: { message: string; }) => createError(next, err.message))
    }
    catch(err){
      createError(next, "Invalid Token, please retry")
    }
  }
}
