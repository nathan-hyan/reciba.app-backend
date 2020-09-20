const router = require("express").Router();
const Invoice = require("../models/Invoice");

router.post("/", async (req, res) => {
  const createdInvoice = new Invoice({
    ...req.body,
  });

  try {
    const response = await createdInvoice.save();
    res.send({ success: true, message: "Invoice created", id: response._id });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: `Error ocurred ${err.message}` });
  }
});

router.put("/addSignature/:id", async (req, res) => {
  const selectedInvoice = await Invoice.findOne({ _id: req.params.id });
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
