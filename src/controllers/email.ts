import { Response, NextFunction } from "express";
import { invoiceReadyMessage, petitionToSign } from "../constants/mailText";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Invoice from "../models/invoice";
import createError from "../middleware/createError";

export default class emailHandler {
  constructor() {}

  public sendPetitionToSign(req: any, res: Response, next: NextFunction) {
    let { invoiceId, from, to } = req.body;
    const host = process.env.MAILHOST as string;

    (async () => {
      let transporter = nodemailer.createTransport({
        host,
        secure: true,
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
          ciphers: "SSLv3",
        },
        requireTLS: true,
        port: process.env.EMAIL_PORT,
        debug: true,
        auth: {
          user: process.env.SENDERMAIL,
          pass: process.env.SENDERPASS,
        },
      } as SMTPTransport.Options);

      await transporter
        .sendMail({
          from: `Reciba.app <${process.env.SENDERMAIL}>`,
          to,
          subject: `Comprobante a firmar`,
          html: petitionToSign(from, invoiceId),
        })
        .then(() => {
          Invoice.findOneAndUpdate(
            { _id: invoiceId },
            {
              alreadySent: {
                isAlreadySent: true,
                emailAddress: to,
              },
            }
          )
            .then(() => {
              res.send({ success: true, message: "¡Mail enviado!" });
            })
            .catch((err) => createError(next, err.message));
        })
        .catch((err) => createError(next, err.message));
    })();
  }

  public sendInvoice(req: any, res: Response, next: NextFunction) {
    let { file, date, email } = req.body;

    (async () => {
      let transporter = nodemailer.createTransport({
        host: process.env.MAILHOST,
        secure: true,
        secureConnection: false,
        tls: {
          ciphers: "SSLv3",
        },
        requireTLS: true,
        port: process.env.EMAILPORT,
        debug: true,
        auth: {
          user: process.env.SENDERMAIL,
          pass: process.env.SENDERPASS,
        },
      } as SMTPTransport.Options);

      await transporter
        .sendMail({
          from: `Reciba.app <${process.env.SENDERMAIL}>`,
          to: email,
          subject: `Comprobante - ${date}`,
          html: invoiceReadyMessage,
          attachments: [
            {
              filename: `Comprobante - ${date}.pdf`,
              path: file,
            },
          ],
        })
        .then((info) => {
          res.send({ success: true, message: "¡Mail enviado!" });
        })
        .catch((err) => createError(next, err.message));
    })();
  }
}