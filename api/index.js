import pkg from "express";
const { Router } = pkg;
import auth from "./routes/auth";
import tasks from "./routes/tasks";
import users from "./routes/users";

export default () => {
  const app = Router();
  auth(app);
  tasks(app);
  users(app);

  //definir las rutas de cada rol
  return app;
};
