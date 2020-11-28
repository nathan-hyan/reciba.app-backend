import createError from '../middleware/createError';
import User from '../models/user';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { create } from 'domain';

export default class user {
  /**
   * Checks if the salted password entered by the user
   * matches with the one on the database
   *
   * @param password Password entered by user
   * @param email Email of the user to compare with
   */

  private async isValidPassword(email: string, password: string) {
    const dbUser: any = await User.findOne({ email });
    if (!dbUser) {
      throw Error('No user found');
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

  private async checkIfEmailAlreadyExist(email: string) {
    const exist = await User.findOne({ email });

    return !!exist;
  }

  /**
   * Gets a plain text password and hashes it with
   * salt
   *
   * @param password string - Password to hash
   */

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  /**
   * Creates a token to validate calls from
   * the front-end
   *
   * @param userId Id from the loggedIn user
   */
  private async createToken(email: string) {
    const secretToken = process.env.TOKEN || 'no';
    const dbUser: any = await User.findOne({ email });

    if (secretToken === 'no' || !dbUser) {
      throw Error('Token or user invalid');
    } else {
      return JWT.sign({ _id: dbUser._id }, secretToken);
    }
  }

  public async createUser(req: any, res: Response, next: NextFunction) {
    if (await this.checkIfEmailAlreadyExist(req.body.email)) {
      createError(next, 'Email already exists');
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await this.hashPassword(req.body.password)
      });

      try {
        await user.save();
        res.send({ success: true, message: 'User created' });
      } catch (error) {
        createError(next, error.message);
      }
    }
  }

  public async login(req: any, res: Response, next: NextFunction) {
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
          expiresIn: process.env.TOKEN_TIME
        });
        res.header('auth', token);
        await User.findOneAndUpdate(
          { _id: user._id },
          { lastLogin: new Date().toString() }
        );
        res.send({
          success: true,
          message: `Welcome back ${user.name}`,
          data: { name: user.name, token }
        });
      }
    }
  }

  public async checkForLoggedInUser(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    {
      let userExist;

      try {
        userExist = await User.findOne({ _id: req.user.id });
      } catch (err) {
        createError(next, 'Session expired, please, log in again');
        return;
      }

      if (userExist) {
        try {
          const verifiedToken: any = JWT.verify(
            req.body.storedToken,
            process.env.TOKEN as string
          );
          const currentDate = Date.now().toString().substring(0, 10);

          if (currentDate > verifiedToken.exp) {
            return res.status(401).send({
              success: false,
              message: 'Invalid user, please log in'
            });
          } else {
            const token = JWT.sign(
              { id: userExist._id },
              process.env.TOKEN as string,
              {
                expiresIn: process.env.TOKEN_TIME
              }
            );
            await User.findOneAndUpdate(
              { _id: userExist._id },
              { lastLogin: new Date().toString() }
            );
            res.send({
              success: true,
              message: `Welcome back ${userExist.name}`,
              data: { name: userExist.name, token }
            });
          }
        } catch (err) {
          return res.status(401).send({
            success: false,
            message: 'Invalid user, please log in'
          });
        }
      } else {
        return res.status(401).send({
          success: false,
          message: 'Invalid user, please log in'
        });
      }
    }
  }
}
