import router from "express";
import user from "../controllers/auth";
import hasUser from "../middleware/hasUser";
import { middleware } from "express-hcaptcha";
const authRoute = router.Router();
const { createUser, login, checkForLoggedInUser } = new user();

authRoute.post(
  "/register",
  middleware.validate(process.env.CAPTCHASECRET),
  (req, res, next) => createUser(req, res, next)
);
authRoute.post(`/login`, (req, res, next) => login(req, res, next));
authRoute.post("/loggedInUser", hasUser, (req, res, next) =>
  checkForLoggedInUser(req, res, next)
);

export default authRoute;
