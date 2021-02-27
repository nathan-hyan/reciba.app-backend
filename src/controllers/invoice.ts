import { Response, NextFunction } from "express";
import createError from "../middleware/createError";
import Invoice from "../models/invoice";
import User from "../models/user";
import GlobalCounter, { _Counter } from "../models/globalCounter";
import { CustomRequest, UserType } from "../constants/types";

interface OutputQuery {
  createdAt?: {
    $gte?: Date | string;
    $lte?: Date | string;
  };
  tags?: { $regex: string; $options: "i" };
  payment?: "check" | "transfer" | "cash" | "creditcard";
}

class query {
  constructor(
    private from: string | Date,
    private to: string | Date,
    private tags: string,
    private types: "check" | "transfer" | "cash" | "creditcard" | "undefined"
  ) {}

  private startOfMonthDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  public build() {
    const query: OutputQuery = {};
    const from = this.from !== "undefined" ? this.from : "";
    const to = this.to !== "undefined" ? this.to : "";
    const tags = this.tags !== "undefined" ? this.tags : "";
    const types = this.types !== "undefined" ? this.types : "";

    if (!from && !to) {
      query.createdAt = { $gte: this.startOfMonthDate(new Date()) };
    }

    if (from && !to) {
      query.createdAt = { $gte: from };
    }
    if (to && !from) {
      query.createdAt = { $lte: to };
    }

    if (from && to) {
      query.createdAt = {
        $gte: from,
        $lte: to,
      };
    }

    if (tags) {
      query.tags = { $regex: tags, $options: "i" };
    }

    if (types) {
      query.payment = types;
    }

    console.log(query);
    return query;
  }
}

export default class invoice {
  public getCompletedinvoices(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): void {
    const newQuery = new query(
      req.query.from,
      req.query.to,
      req.query.tags,
      req.query.types
    ).build();

    Invoice.find({ ...newQuery, user: req.user.id, pending: false })
      .sort({ createdAt: "desc" })
      .then((response) => {
        res.send({ success: true, data: response });
      })
      .catch((err: { message: string }) => {
        createError(next, err.message);
      });
  }

  public getPendinginvoices(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): void {
    // const newQuery = new query(
    //   req.query.from,
    //   req.query.to,
    //   req.query.tags
    // ).build();

    Invoice.find({ user: req.user.id, pending: true })
      .sort({ createdAt: "desc" })
      .then((response) => {
        res.send({ success: true, data: response });
      })
      .catch((err: { message: string }) => {
        createError(next, err.message);
      });
  }

  public async getSingleInvoice(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
  const logo: UserType = req.user ? await User.findOne({_id: req.user.id}) : {logo: undefined};

    Invoice.findOne({ _id: req.params.id })
      .then((response) => {
        res.send({ success: true, data: {...response._doc, logo: logo.logo} });
      })
      .catch((err: { message: string }) => {
        createError(next, err.message);
      });
  }

  public createGlobalCounter(req: CustomRequest, res: Response): void {
    new GlobalCounter({ counter: 0 }).save().then((response) => {
      res.send({ success: true, data: response });
    });
  }

  public async createInvoice(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    let { counter } = (await GlobalCounter.findOne({
      _id: "5f67b4f0dab3807105ed751b",
    })) as _Counter;

    // const user = await User.findOne({ _id: req.user.id });

    const createdInvoice = new Invoice({
      ...req.body,
      user: req.user ? req.user.id : null,
      // logo: user?.logo ? user.logo : null,
      invoiceNumber: req.user ? req.user.lastInvoiceNumber : counter,
    });

    try {
      const response = await createdInvoice.save();

      if (req.user) {
        await User.findOneAndUpdate(
          { _id: req.user.id },
          { lastInvoiceNumber: ++req.user.lastInvoiceNumber }
        );
      } else {
        await GlobalCounter.findOneAndUpdate(
          { _id: "5f67b4f0dab3807105ed751b" },
          { counter: ++counter }
        );
      }

      res.send({
        success: true,
        message: "Invoice created",
        id: response._id,
      });
    } catch (err) {
      createError(next, err.message);
    }
  }

  public editInvoice(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return Invoice.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((response) => {
        res.send({
          success: true,
          message: "Boleta guardada",
          data: response,
        });
      })
      .catch((err) => {
        createError(next, err.message);
      });
  }

  public async addSignatureToInvoice(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { sign } = req.body;

    const alreadySigned = await Invoice.findOne({
      _id: req.params.id,
      pending: false,
    });

    if (!alreadySigned) {
      try {
        const updatedInvoice = await Invoice.findOneAndUpdate(
          { _id: req.params.id },
          { sign, pending: false }
        );

        res.send({
          success: true,
          message: "Firma guardada correctamente",
          id: updatedInvoice._id
        });
      } catch (err) {
        createError(next, err.message);
      }
    } else {
      createError(next, "This invoice is already signed.");
    }
  }

  public deleteInvoice(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): void {
    Invoice.findOneAndDelete({ _id: req.params.id })
      .then(() => res.send({ success: true, message: "Boleta eliminada" }))
      .catch((err) => {
        createError(next, err.message);
      });
  }
}
