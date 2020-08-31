const router = require("express").Router();
const User = require("../models/User");
const Invoice = require("../models/Invoice");
const { getPriority } = require("os");

router.post("/", async (req, res) => {
  const createdInvoice = new Invoice({
    ...req.body,
  });

  try {
    const response = await createdInvoice.save();
    console.log(response);
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

  console.log(req.params.id);
  console.log(selectedInvoice);
  console.log(!!sign);

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
  Invoice.findOne({ _id: req.params.id }).then((response) => {
    res.send({ message: "Ok", data: response });
  });
});

module.exports = router;
