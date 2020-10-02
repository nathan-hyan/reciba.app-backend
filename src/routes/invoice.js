const router = require("express").Router();
const Invoice = require("../models/Invoice");
const GlobalCounter = require("../models/GlobalCounter");
const { getInvoices } = require("../routes/helper/queryBuilder");
const hasUser = require("./middlewares/hasUser");
const User = require("../models/User");
const private = require("./middlewares/private");

router.get("/completed", private, (req, res) => {
  Invoice.find({ user: req.user.id, pending: false })
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err) =>
      res.status(500).send({ success: false, message: err.message })
    );
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

router.get(`/pending`, private, (req, res) => {
  Invoice.find({ user: req.user.id, pending: true })
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

router.post("/", hasUser, async (req, res) => {
  let { counter } = await GlobalCounter.findOne({
    _id: "5f67b4f0dab3807105ed751b",
  });

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

    res.send({ success: true, message: "Invoice created", id: response._id });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: `Error ocurred ${err.message}` });
  }
});

router.put("/edit/:id", private, (req, res) => {
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
  }
});

router.delete("/:id", private, (req, res) => {
  Invoice.findOneAndDelete({ _id: req.params.id })
    .then((response) =>
      res.send({ success: true, message: "Boleta eliminada" })
    )
    .catch((err) => {
      res.status(400).send({ success: false, message: err.message });
    });
});

module.exports = router;
