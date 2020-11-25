import { Schema, model, Document } from "mongoose";

export interface UserSchema extends Document {
  name: string;
  email: string;
  password: string;
  lastLogin?: string;
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
    lastInvoiceNumber: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<UserSchema>("User", userSchema);
