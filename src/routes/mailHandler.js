const nodemailer = require("nodemailer");
const Invoice = require("../models/Invoice");
const router = require("express").Router();

router.post(`/send/signaturePetition/`, (req, res) => {
  let { invoiceId, from, to } = req.body;

  const html = `<h1>¡Hola!</h1><br><br/><p>${from} te ha enviado esta boleta para ser firmada, hacé click en <a href='https://nathan-hyan.github.io/reciba-app-frontend/offlinesignature/${invoiceId}'>este link</a> para ir</p><p>En caso de que no hayas estado esperando este mail, Es mejor ignorarlo.`;

  (async () => {
    let transporter = nodemailer.createTransport({
      host: "mail.rollingcodeschool.com",
      port: 25,
      secure: false,
      auth: {
        user: process.env.SENDERMAIL,
        pass: process.env.SENDERPASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter
      .sendMail({
        from: "RollingCode School <academy@rollingcodeschool.com>",
        to,
        subject: `Comprobante a firmar`,
        html,
      })
      .then((info) => {
        Invoice.findOneAndUpdate(
          { _id: invoiceId },
          {
            alreadySent: {
              isAlreadySent: true,
              emailAddress: to,
            },
          }
        )
          .then((response) => {
            res.send({ success: true, message: "¡Mail enviado!" });
          })
          .catch((err) => res.send({ success: false, message: err.message }));
      })
      .catch((err) => res.send({ success: false, message: err.message }));
  })();
});

router.post("/send/invoice", (req, res) => {
  let { file, date, email } = req.body;

  const html = `
  <h1>¡Tu comprobante está listo!</h1>
  <br></br>
  <p>Muchas gracias por confiar en nosotros</p>
  `;

  (async () => {
    let transporter = nodemailer.createTransport({
      host: "mail.rollingcodeschool.com",
      port: 25,
      secure: false,
      auth: {
        user: process.env.SENDERMAIL,
        pass: process.env.SENDERPASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter
      .sendMail({
        from: "RollingCode School <academy@rollingcodeschool.com>",
        to: email,
        subject: `Comprobante - ${date}`,
        html,
        attachments: {
          filename: `Comprobante - ${date}.pdf`,
          path: file,
        },
      })
      .then((info) => {
        res.send({ success: true, message: "¡Mail enviado!" });
      })
      .catch((err) => res.send({ success: false, message: err.message }));
  })();
});

module.exports = router;
