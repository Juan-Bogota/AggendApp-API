import mongoose from "mongoose";
import environment from "../config/environment";

const url = environment.mongo_conn;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", () => console.log("Error connecting with database"));
db.once("open", () => console.log("Success connecting with database"));

export default db;
