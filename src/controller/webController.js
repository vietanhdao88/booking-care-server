const {
  getAll,
  addNewUserService,
  updateUserService,
  getUserByIdService,
  deleteUserService,
} = require("../service/service");

const testWebController = async (req, res) => {
  const data = await getAll();
 
  res.render("home", { users: data });
};
const getCRUDPage = async (req, res) => {
  res.render("crud");
};
const addNewUserController = async (req, res) => {
  await addNewUserService(req.body);
};
const getUserController = async (req, res) => {
  const data = await getUserByIdService(req.query.id);
  res.render("detail", { user: data });
};
const updateUserController = async (req, res) => {
  await updateUserService(req.body);
  res.redirect("/");
};
const getUpdateUserPage = async (req, res) => {
  const data = await getUserByIdService(req.query.id);
  res.render("update", { user: data });
};
const deleteUserController = async (req, res) => {
  await deleteUserService(req.query.id);
  res.redirect("/");
};
module.exports = {
  testWebController,
  getCRUDPage,
  addNewUserController,
  updateUserController,
  getUserController,
  getUpdateUserPage,
  deleteUserController,
};
