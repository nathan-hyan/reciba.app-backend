const router = require("express").Router();
const Invoice = require("../models/Invoice");
const GlobalCounter = require("../models/GlobalCounter");
const { getInvoices } = require("../routes/helper/queryBuilder");

// router.get("/", (req, res) => {
//   // let { userId, currency } = req.query;

//   // if (!userId) {
//   //   throw Error("Acceso Denegado.");
//   // }

//   Invoice.find()
//     .then((response) => {
//       res.send({ success: true, data: response });
//     })
//     .catch((err) => {
//       res.send({ success: false, message: err.message });
//     });
// });

router.get("/completed", (req, res) => {
  Invoice.find({ pending: false })
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err) =>
      res.status(500).send({ success: false, message: err.message })
    );
});

router.get(`/pending`, (req, res) => {
  Invoice.find({ pending: true })
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err) =>
      res.status(500).send({ success: false, message: err.message })
    );
});

router.post("/createGlobalCounter", (req, res) => {
  new GlobalCounter({ counter: 0 }).save().then((i) => {
    res.send(i);
  });
});

router.post("/", async (req, res) => {
  let { counter } = await GlobalCounter.findOne({
    _id: "5f67b4f0dab3807105ed751b",
  });

  const createdInvoice = new Invoice({
    ...req.body,
    invoiceNumber: counter,
  });

  try {
    const response = await createdInvoice.save();
    await GlobalCounter.findOneAndUpdate(
      { _id: "5f67b4f0dab3807105ed751b" },
      { counter: ++counter }
    );

    console.log("yes?");
    res.send({ success: true, message: "Invoice created", id: response._id });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: `Error ocurred ${err.message}` });
  }
});

router.put("/edit/:id", (req, res) => {
  Invoice.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((response) => {
      res.send({ success: true, message: "Boleta guardada", data: response });
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        message:
          "Ocurrió un error en el servidor, reinicie la página o vuelva a escanear el codigo",
      });

      console.log(err.message);
    });
});

router.put("/addSignature/:id", async (req, res) => {
  const { sign } = req.body;

  try {
    await Invoice.findOneAndUpdate({ _id: req.params.id }, { sign });

    res.send({ success: true, message: "Firma guardada correctamente" });
  } catch (err) {
    res.status(400).send({
      success: false,
      message:
        "Ocurrió un error en el servidor, reinicie la página o vuelva a escanear el codigo",
    });

    console.log(err.message);
  }
});

router.get(`/single/:id`, async (req, res) => {
  Invoice.findOne({ _id: req.params.id })
    .then((response) => {
      res.send({ message: "Ok", data: response });
    })
    .catch(() => {
      res.status(400).send({
        success: false,
        message: "Ocurrió un error buscando la boleta",
      });
    });
});

module.exports = router;
