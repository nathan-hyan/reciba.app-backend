import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import createError from "./createError";

const verify = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("auth");

  if (!token) {
    createError(next, "Access denied", 401);
  } else {
    try {
      const verified = JWT.verify(token, process.env.TOKEN as string);
      req.user = verified;
      next();
    } catch (err) {
      createError(next, "Access denied", 401);
    }
  }
};

export default verify;
