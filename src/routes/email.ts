import router from "express";
import emailHandler, { CustomEmailRequest } from "../controllers/email";
const email = router.Router();
const { sendInvoice, sendPetitionToSign } = new emailHandler();

email.post("/send/signaturePetition/", (req, res, next) => {
  sendPetitionToSign(req as unknown as CustomEmailRequest, res, next);
});

email.post(`/send/invoice`, (req, res, next) => {
  sendInvoice(req as unknown as CustomEmailRequest, res, next);
});

export default email;
