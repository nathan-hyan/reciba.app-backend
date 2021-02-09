import router from "express";
import { CustomRequest } from "../constants/types";
import user from "../controllers/auth";
import hasUser from "../middleware/hasUser";
const authRoute = router.Router();
const { createUser, login, checkForLoggedInUser, confirmUser } = new user();

authRoute.post("/register", (req, res, next) => createUser(req as unknown as CustomRequest, res, next));
authRoute.post(`/login`, (req, res) => login(req as unknown as CustomRequest, res));
authRoute.post("/loggedInUser", hasUser as never, (req, res, next) =>
  checkForLoggedInUser(req as unknown as CustomRequest, res, next)
);
authRoute.post("/confirm", (req, res, next) => confirmUser(req as unknown as CustomRequest, res, next))

export default authRoute;
