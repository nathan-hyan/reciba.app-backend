import router from "express";
import { CustomRequest } from "../constants/types";
import user from "../controllers/auth";
import hasUser from "../middleware/hasUser";
const authRoute = router.Router();
const { createUser, login, checkForLoggedInUser, confirmUser, editUser, getUserData, resetInvoiceCounter, changePassword } = new user();

authRoute.post("/register", (req, res, next) => createUser(req as unknown as CustomRequest, res, next));
authRoute.post(`/login`, (req, res) => login(req as unknown as CustomRequest, res));
authRoute.post("/loggedInUser", hasUser as never, (req, res) =>
  checkForLoggedInUser(req as unknown as CustomRequest, res)
);
authRoute.post("/confirm", (req, res, next) => confirmUser(req as unknown as CustomRequest, res, next));
authRoute.get("/getUser/:id", hasUser as never, (req, res, next) => getUserData(req as unknown as CustomRequest, res, next))
authRoute.put("/editProfile/:id", hasUser as never, (req, res, next) => editUser(req as unknown as CustomRequest, res, next))
authRoute.put("/resetInvoiceCounter/:id", hasUser as never, (req, res, next) => resetInvoiceCounter(req as unknown as CustomRequest, res, next));
authRoute.put('/changePassword/:id', hasUser as never, (req, res, next) => changePassword(req, res, next))

export default authRoute;
