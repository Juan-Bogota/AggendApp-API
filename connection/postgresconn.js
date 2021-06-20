import pkg from "sequelize";
const { Sequelize } = pkg;
import env from "../config/environment";

const sequelize = new Sequelize(env.postgres_conn);

const testConnection = async (sequalize) => {
  try {
    await sequalize.authenticate();
    console.log("connection postgres connected");
  } catch (error) {
    console.log("connection postgres error", error);
  }
};
testConnection(sequelize);

export default sequelize;
