import JWT, { Secret } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import User, { UserSchema } from "../models/user";
import { CustomRequest, UserType } from "../constants/types";

const hasUser = async (req: CustomRequest, res: Response, next: NextFunction):Promise<void> => {
  const token: string = req.header("auth") || "";

  try {
    const verified = JWT.verify(token, process.env.TOKEN as Secret) as UserType;
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
