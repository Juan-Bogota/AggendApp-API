import pkg from "express";
const { Router } = pkg;
import usersController from "../../controllers/usersCtrl";
import { authVerify } from "../../middlewares/authVerify";
const route = Router();

export default (app) => {
  app.use("/users", route);

  route.put("/profile", [authVerify], usersController.profile);
  route.get("/profile", [authVerify], usersController.getProfile);
  route.get("/", [authVerify], usersController.getAll);
};
