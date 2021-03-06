import { Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { CustomRequest, UserType } from "../constants/types";
import createError from "./createError";

const verify = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.header("auth");
  console.log({token})

  if (!token) {
    createError(next, "Access denied", 401);
  } else {
    try {
      const verified = JWT.verify(token, process.env.TOKEN as string);
      req.user = verified as UserType;
      next();
    } catch (err) {
      createError(next, "Access denied", 401);
    }
  }
};

export default verify;
