import pkg from "express";
const { Router } = pkg;
const route = Router();
import { authVerify } from "../../middlewares/authVerify";
import taskController from "../../controllers/tasksCtrl";

export default (app) => {
  app.use("/tasks", route);

  route.get("/", [authVerify], taskController.getAll);
  route.get("/:id", [authVerify], taskController.detail);

  route.post("/create", [authVerify], taskController.create);
  route.put("/status/:id", [authVerify], taskController.updateStatus);
};
