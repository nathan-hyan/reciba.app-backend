import verify from "../middleware/verifyUser";
import router from "express";
import hasUser from "../middleware/hasUser";
import invoice from "../controllers/invoice";
import { CustomRequest } from "../constants/types";

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

invoices.get("/completed/", verify as never, (req, res, next) =>
  getCompletedinvoices(req as unknown as CustomRequest, res, next)
);
invoices.get(`/pending`, verify as never, (req, res, next) =>
  getPendinginvoices(req as unknown as CustomRequest, res, next)
);
invoices.get(`/single/:id`, hasUser as never, (req, res, next) =>
  getSingleInvoice(req as unknown as CustomRequest, res, next)
);

invoices.post("/createGlobalCounter", (req, res) =>
  createGlobalCounter(req as unknown as CustomRequest, res)
);
invoices.post("/", hasUser as never, (req, res, next) => createInvoice(req as unknown as CustomRequest, res, next));

invoices.put("/edit/:id", verify as never, (req, res, next) =>
  editInvoice(req as unknown as CustomRequest, res, next)
);
invoices.put("/addSignature/:id", (req, res, next) =>
  addSignatureToInvoice(req as unknown as CustomRequest, res, next)
);

invoices.delete("/:id", verify as never, (req, res, next) =>
  deleteInvoice(req as unknown as CustomRequest, res, next)
);
export default invoices;
