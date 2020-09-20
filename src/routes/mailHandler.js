const nodemailer = require("nodemailer");
const router = require("express").Router();

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
