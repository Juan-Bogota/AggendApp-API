import dotenv from "dotenv";
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

export default {
  mongo_conn: process.env.MONGO_CONN,
  secret: process.env.JWT_SECRET,
  postgres_conn: process.env.POSTGRES_CONN,
};
