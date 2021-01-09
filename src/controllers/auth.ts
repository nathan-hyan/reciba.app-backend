import createError from "../middleware/createError";
import User, { UserSchema } from "../models/user";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, response, Response } from "express";
import { verify } from "hcaptcha";
import { CustomRequest } from "../constants/types";

interface JWTToken {
  exp: string;
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

          const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
          });

          try {
            await user.save();
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
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: `Email or password incorrect` });
    } else {
      // Check for valid password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res
          .status(401)
          .send({ success: false, message: `Email or password incorrect` });
      } else {
        // Create and send token
        const token = JWT.sign({ id: user._id }, process.env.TOKEN as string, {
          expiresIn: process.env.TOKEN_TIME,
        });
        res.header("auth", token);
        await User.findOneAndUpdate(
          { _id: user._id },
          { lastLogin: new Date().toString() }
        );
        res.send({
          success: true,
          message: `Welcome back ${user.name}`,
          data: { name: user.name, token },
        });
      }
    }

    return res
      .status(401)
      .send({ success: false, message: `Email or password incorrect` });
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
}
