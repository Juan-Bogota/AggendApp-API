import usersService from "../services/usersServices";

const profile = async (req, res) => {
  try {
    const { idUser } = req.user;
    const user = await usersService.updateUser(idUser, req.body);
    res.json(user);
  } catch (error) {
    res.status(error.errorStatus).send(error.message);
  }
};

const getProfile = async (req, res) => {
  try {
    const { idUser } = req.user;
    const user = await usersService.getUser(idUser);
    res.json(user);
  } catch (error) {
    res.status(error.errorStatus).send(error.message);
  }
}
const create = (req, res) => {
  res.send("Create a user");
};

const getAll = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users);
  } catch (error) {
    res.status(error.errorStatus).send(error.message);
  }
};



export default {
  profile,
  create,
  getAll,
  getProfile
};
