import { Request, Response, NextFunction } from "express";
import createError from "../middleware/createError";
import Invoice from "../models/invoice";
import User from "../models/user";
import GlobalCounter, { _Counter } from "../models/globalCounter";

interface InputQuery {
  from: string;
  to: string;
  tags: string;
}

interface OutputQuery {
  createdAt?: {
    $gte?: Date | string;
    $lte?: Date | string;
  };
  tags?: { $regex: string; $options: "i" };
}

class query {
  constructor(
    private from: string | Date,
    private to: string | Date,
    private tags: string
  ) {}

  private startOfMonthDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  public build() {
    let query: OutputQuery = {};
    const from = this.from !== "undefined" ? this.from : "";
    const to = this.to !== "undefined" ? this.to : "";
    const tags = this.tags !== "undefined" ? this.tags : "";

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
    return query;
  }
}

export default class invoice {
  public getCompletedinvoices(req: any, res: Response, next: NextFunction) {
    const newQuery = new query(
      req.query.from,
      req.query.to,
      req.query.tags
    ).build();

    Invoice.find({ ...newQuery, user: req.user.id, pending: false })
      .sort({createdAt: "desc"})
      .then((response) => {
        res.send({ success: true, data: response });
      })
      .catch((err: { message: string }) => {
        createError(next, err.message);
      });
  }

  public getPendinginvoices(req: any, res: Response, next: NextFunction) {
    const newQuery = new query(
      req.query.from,
      req.query.to,
      req.query.tags
    ).build();

    Invoice.find({ ...newQuery, user: req.user.id, pending: true })
      .sort({createdAt: "desc"})
      .then((response) => {
        res.send({ success: true, data: response });
      })
      .catch((err: { message: string }) => {
        createError(next, err.message);
      });
  }

  public getSingleInvoice(req: any, res: Response, next: NextFunction) {
    Invoice.findOne({ _id: req.params.id })
      .then((response) => {
        res.send({ success: true, data: response });
      })
      .catch((err: { message: string }) => {
        createError(next, err.message);
      });
  }

  public createGlobalCounter(req: any, res: Response, next: NextFunction) {
    new GlobalCounter({ counter: 0 }).save().then((response) => {
      res.send({ success: true, data: response });
    });
  }

  public async createInvoice(req: any, res: Response, next: NextFunction) {
    let { counter } = (await GlobalCounter.findOne({
      _id: "5f67b4f0dab3807105ed751b",
    })) as _Counter;

    const createdInvoice = new Invoice({
      ...req.body,
      user: req.user ? req.user.id : null,
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

  public editInvoice(req: any, res: Response, next: NextFunction) {
    Invoice.findOneAndUpdate({ _id: req.params.id }, req.body)
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
    req: any,
    res: Response,
    next: NextFunction
  ) {
    const { sign } = req.body;

    try {
      await Invoice.findOneAndUpdate(
        { _id: req.params.id },
        { sign, pending: false }
      );

      res.send({
        success: true,
        message: "Firma guardada correctamente",
      });
    } catch (err) {
      createError(next, err.message);
    }
  }

  public deleteInvoice(req: any, res: Response, next: NextFunction) {
    Invoice.findOneAndDelete({ _id: req.params.id })
      .then((response) =>
        res.send({ success: true, message: "Boleta eliminada" })
      )
      .catch((err) => {
        createError(next, err.message);
      });
  }
}
