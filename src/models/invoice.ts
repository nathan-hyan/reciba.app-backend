import { Schema, model } from "mongoose";

const Invoice = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      default: null,
      required: false,
    },
    invoiceNumber: {
      type: Number,
      required: true,
    },

    logo: {
      type: String,
      required: false,
    },

    date: {
      type: Date,
      default: new Date(),
      required: true,
    },

    received: {
      type: String,
      default: "-",
      required: true,
    },

    from: {
      type: String,
      required: true,
    },

    amountText: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    concept: {
      type: String,
      required: true,
    },

    sign: {
      type: String,
      required: false,
    },

    currency: {
      type: String,
      default: "ARS",
      required: true,
    },

    pending: {
      type: Boolean,
      default: false,
      required: true,
    },

    tags: {
      type: Array,
      default: [],
      required: false,
    },
    alreadySent: {
      isAlreadySent: Boolean,
      emailAddress: String,
    },
  },
  { timestamps: true }
);

export default model("Invoice", Invoice);
