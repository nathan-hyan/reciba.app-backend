import { Schema, model, Document } from "mongoose";

export interface _Counter extends Document {
  counter: number;
}

const Counter = new Schema({
  counter: {
    type: Number,
    required: true,
  },
});

export default model<_Counter>("Counter", Counter);
