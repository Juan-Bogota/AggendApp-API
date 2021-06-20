import pkg from "express";
const { Router } = pkg;
const route = Router();

import authController from "../../controllers/authCtrl";
import { authVerify } from "../../middlewares/authVerify";
import { signinScheme } from "../middlewares/signinScheme";

export default (app) => {
  app.use("/auth", route);
  route.post("/signup", authController.signup);
  route.post("/signin", [signinScheme], authController.signin);
  route.post("/check", [authVerify], authController.check)
};
