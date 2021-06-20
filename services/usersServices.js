import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import LogsServices from "./logServices";
import environment from "../config/environment";
import UserModel from "../models/userModel";
import Error from "../utils/Error";
import ErrorTypes from "../utils/ErrorTypes";
import LogsTypes from "../utils/LogsTypes";

const validate = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const payload = {
          idUser: user.id,
          role: user.role,
        };
        await LogsServices.create({ who: user.id, log: LogsTypes.LOGIN });
        const token = jwt.sign(payload, environment.secret, {
          expiresIn: "12h",
        });
        return { token };
      }
    }
    throw Error({ message: ErrorTypes.AUTHENTICATION, errorStatus: 401 });
  } catch (error) {
    throw Error({
      message: error.message || ErrorTypes.DATABASE_QUERY,
      errorStatus: error.errorStatus,
      stackTrace: error.stackTrace || error,
    });
  }
};

const create = async ({ name, rol, email, password }) => {
  try {
    const userCheckEmail = await UserModel.findOne({ email: email });
    if (userCheckEmail)
      throw Error({ message: ErrorTypes.EMAIL_DUPLICATED, errorStatus: 401 });
    
    const saltRounds = 10;
    const passwordEncrypted = await bcrypt.hash(password, saltRounds);
    const user = UserModel({
      name,
      rol,
      email,
      password: passwordEncrypted,
    });
    await LogsServices.create({ who: user.id, log: LogsTypes.CREATE_USER });
    await user.save();
    return user;
  } catch (error) {
    throw Error({
      message: error.message || ErrorTypes.DATABASE_QUERY,
      errorStatus: error.errorStatus,
      stackTrace: error.stackTrace || error,
    });
  }
};

const getAll = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    throw Error({
      message: error.message || ErrorTypes.DATABASE_QUERY,
      errorStatus: error.errorStatus,
      stackTrace: error.stackTrace,
    });
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await UserModel.findOne({ _id: id });

    const saltRounds = 10;
    const passwordEncrypted = await bcrypt.hash(data.password, saltRounds);
    user.name = data.name;
    user.password = passwordEncrypted;
    user.email = data.email;
    await user.save();
    await LogsServices.create({ who: id, log: LogsTypes.UPDATE_PROFILE });
    return { message: "Update profile ok" };
  } catch (error) {
    throw Error({
      message: error.message || ErrorTypes.DATABASE_QUERY,
      errorStatus: error.errorStatus,
      stackTrace: error.stackTrace,
    });
  }
};

const getUser = async (id) => {
  try {
    const user = await UserModel.findOne({ _id: id });
    return user;
  } catch (error) {
    throw Error({
      message: error.message || ErrorTypes.DATABASE_QUERY,
      errorStatus: error.errorStatus,
      stackTrace: error.stackTrace,
    });
  }
}

export default {
  create,
  validate,
  getAll,
  updateUser,
  getUser
};
