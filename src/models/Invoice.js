const { Schema, model } = require("mongoose");

const Invoice = new Schema(
  {
    user: {
      type: Schema.ObjectId,
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
  },
  { timestamps: true }
);

module.exports = model("Invoice", Invoice);
