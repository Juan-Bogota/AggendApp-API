import { TASK_STATUS } from "../config/constants";
import TaskModel from "../models/taskModel";
import Error from "../utils/Error";
import ErrorTypes from "../utils/ErrorTypes";
import LogsTypes from "../utils/LogsTypes";
import LogsServices from "./logServices";

const create = async ({
  title,
  due_date,
  description,
  responsible,
  collaborators,
}) => {
  try {
    const task = TaskModel({
      title,
      due_date,
      description,
      responsible,
      collaborators,
    });
    await LogsServices.create({ who: responsible, log: LogsTypes.CREATE_TASK });
    await task.save();
    return task;
  } catch (err) {
    throw Error({
      message: error.message || ErrorTypes.DATABASE_QUERY,
      errorStatus: error.errorStatus,
      stackTrace: error.stackTrace || error,
    });
  }
};

const detail = async (id) => {
  try {
    const query = { _id: id };
    const task = await TaskModel.findById(id)
      .populate("responsible", "name email")
      .populate("collaborators", "name email")
      .exec();
    return task;
  } catch (error) {
    throw Error({
      message: error.message || ErrorTypes.DATABASE_QUERY,
      errorStatus: error.errorStatus,
      stackTrace: error.stackTrace || error,
    });
  }
};

const getAll = async ({ status, due_date_init, due_date_end }) => {
  try {
    // TODO: filtrar por el usuario responsable
    const query = {};
    if (status) query.status = status;
    if (due_date_init && due_date_end) {
      query.due_date = { $gte: due_date_init, $lte: due_date_end };
    }
    
    const tasks = await TaskModel.find(query)
      .populate("responsible", "name email")
      .populate("collaborators", "name email")
      .exec();
    return tasks;
  } catch (error) {
    throw Error({
      message: error.message || ErrorTypes.DATABASE_QUERY,
      errorStatus: error.errorStatus,
      stackTrace: error.stackTrace || error,
    });
  }
};

const updateStatus = async (status, id) => {
  try {
    //await TaskModel.updateOne(
    //  { _id: id },
    //  { status: Number(status) },
    //
    //);
    const task = await TaskModel.findById(id);
    await LogsServices.create({ who: id, log: LogsTypes.UPDATE_STATUS_TASK });
    task.status = Number(status);
    await task.save();

    return { message: "Update status ok" };
  } catch (error) {
    throw Error({
      message: error.message || ErrorTypes.DATABASE_QUERY,
      errorStatus: error.errorStatus,
      stackTrace: error.stackTrace || error,
    });
  }
};

const verifyTaskForUpdateStatus = async() => {
  try {
    
    // TODO: filtrar por el usuario responsable
    const query = {};
    query.status = { $gte: TASK_STATUS.Assigned, $lte: TASK_STATUS.Progress };
    query.due_date = { $lt: new Date().toISOString().split('T')[0]};
    const tasks = await TaskModel.find(query);
    return tasks.map(el => ({id:el._id, status: el.status}));
  } catch (error) {
    throw Error({
      message: error.message || ErrorTypes.DATABASE_QUERY,
      errorStatus: error.errorStatus,
      stackTrace: error.stackTrace || error,
    });
  }
}
export default {
  create,
  detail,
  getAll,
  updateStatus,
  verifyTaskForUpdateStatus
};
