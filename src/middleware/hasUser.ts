import JWT, { Secret } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import User, { UserSchema } from "../models/user";

const hasUser = async (req: any, res: Response, next: NextFunction) => {
  const token: string = req.header("auth") || "";

  try {
    const verified = JWT.verify(token, process.env.TOKEN as Secret) as any;
    const { lastInvoiceNumber } = (await User.findOne({
      _id: verified.id,
    })) as UserSchema;

    req.user = { ...verified, lastInvoiceNumber };
    next();
  } catch (err) {
    next();
  }
};

export default hasUser;
