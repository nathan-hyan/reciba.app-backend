import router from "express";
import emailHandler from "../controllers/email";
const email = router.Router();
const { sendInvoice, sendPetitionToSign } = new emailHandler();

email.post("/send/signaturePetition/", (req, res, next) => {
  sendPetitionToSign(req, res, next);
});

email.post(`/send/invoice`, (req, res, next) => {
  sendInvoice(req, res, next);
});

export default email;
