import { Schema, model, Document } from "mongoose";

export interface UserSchema extends Document {
  logo?: string;
  name: string;
  email: string;
  password: string;
  lastLogin?: string;
  confirmed?: boolean;
  lastInvoiceNumber: number;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
    },
    logo: {
      type: String,
      required: false
    },
    lastInvoiceNumber: {
      type: Number,
      default: 0,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  { timestamps: true }
);

export default model<UserSchema>("User", userSchema);
