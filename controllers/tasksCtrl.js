import tasksServices from "../services/tasksServices";

const getAll = async (req, res) => {
  try {
    const query = req.query;
    const tasks = await tasksServices.getAll(query);
    res.json(tasks);
  } catch (error) {
    res.status(error.errorStatus).send(error.message);
  }
};

const detail = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await tasksServices.detail(id);
    res.json(task);
  } catch (error) {
    res.status(error.errorStatus).send(error.message);
  }
};

const create = async (req, res) => {
  try {
    const taskData = req.body;
    const task = await tasksServices.create(taskData);
    res.json(task);
  } catch (err) {}
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const { id } = req.params;
    const updateTask = await tasksServices.updateStatus(status, id);
    res.json(updateTask);
  } catch (error) {
    res.status(error.errorStatus).send(error.message);
  }
};

export default {
  getAll,
  detail,
  create,
  updateStatus,
};
