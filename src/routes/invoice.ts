import verify from "../middleware/verifyUser";
import router from "express";
import hasUser from "../middleware/hasUser";
import invoice from "../controllers/invoice";

const invoices = router.Router();
const {
  addSignatureToInvoice,
  createGlobalCounter,
  createInvoice,
  deleteInvoice,
  editInvoice,
  getCompletedinvoices,
  getPendinginvoices,
  getSingleInvoice,
} = new invoice();

invoices.get("/completed/", verify, (req, res, next) =>
  getCompletedinvoices(req, res, next)
);
invoices.get(`/pending`, verify, (req, res, next) =>
  getPendinginvoices(req, res, next)
);
invoices.get(`/single/:id`, (req, res, next) =>
  getSingleInvoice(req, res, next)
);

invoices.post("/createGlobalCounter", (req, res, next) =>
  createGlobalCounter(req, res, next)
);
invoices.post("/", hasUser, (req, res, next) => createInvoice(req, res, next));

invoices.put("/edit/:id", verify, (req, res, next) =>
  editInvoice(req, res, next)
);
invoices.put("/addSignature/:id", (req, res, next) =>
  addSignatureToInvoice(req, res, next)
);

invoices.delete("/:id", verify, (req, res, next) =>
  deleteInvoice(req, res, next)
);
export default invoices;
