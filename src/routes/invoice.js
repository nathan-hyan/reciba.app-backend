const router = require("express").Router();
const Invoice = require("../models/Invoice");
const GlobalCounter = require("../models/GlobalCounter");
const { getInvoices } = require("../routes/helper/queryBuilder");
const hasUser = require("./middlewares/hasUser");
const User = require("../models/User");
const private = require("./middlewares/private");

const queryBuilder = (inputQuery) => {
  console.log("[INPUTQUERY] >>", inputQuery);
  let { from, to, tags } = inputQuery;

  let query = {};

  if (!from && !to) {
    query.createdAt = { $gte: startOfMonthDate(new Date()) };
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
};

const startOfMonthDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

router.get("/completed/", private, (req, res) => {
  let initialQuery = {};

  initialQuery.from = req.query.from !== "undefined" ? req.query.from : "";
  initialQuery.to = req.query.to !== "undefined" ? req.query.to : "";
  initialQuery.tags = req.query.tags !== "undefined" ? req.query.tags : "";

  const query = queryBuilder(initialQuery);

  Invoice.find({ ...query, user: req.user.id, pending: false })
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err.message });
    });
});

router.get(`/pending`, private, (req, res) => {
  let initialQuery = {};

  initialQuery.from = req.query.from !== "undefined" ? req.query.from : "";
  initialQuery.to = req.query.to !== "undefined" ? req.query.to : "";
  initialQuery.tags = req.query.tags !== "undefined" ? req.query.tags : "";

  const query = queryBuilder(initialQuery);
  console.log("OUTPUT QUERY>>", query);

  Invoice.find({ ...query, user: req.user.id, pending: true })
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, message: err.message });
    });
});

router.get(`/single/:id`, async (req, res) => {
  Invoice.findOne({ _id: req.params.id })
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch(() => {
      res.status(400).send({
        success: false,
        message: "Ocurrió un error buscando la boleta",
      });
    });
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
    await Invoice.findOneAndUpdate(
      { _id: req.params.id },
      { sign, pending: false }
    );

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
