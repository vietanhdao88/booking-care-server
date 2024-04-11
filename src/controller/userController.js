const {
  verifyToken,
  createRefreshToken,
  verifyRefreshToken,
  createJWT,
} = require("../middlerware/jwt");
const db = require("../models");
const {
  addNewUserService,
  handleLoginService,
  getAllUserService,
  getAUserService,
  removeAUserService,
  updateUser,
  updateRefreshTokenService,
} = require("../service/userService");

const handleLoginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errorCode: 1,
      message: "you are missing input parameter!",
    });
  }
  const userData = await handleLoginService(req.body);

  res.cookie("jwt", userData.access_token, {
    maxAge: 60 * 60 * 1000,
  }); //1h
  res.cookie("refresh_token", userData.refresh_token, {
    maxAge: 60 * 60 * 2000,
  });

  return res.status(200).json({
    errorCode: userData.errorCode,
    errorMessage: userData.errorMessage,
    access_token: userData.access_token,
    refresh_token: userData.refresh_token,
    user: userData.user,
  });
};
const handleLogoutController = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.clearCookie("refresh_token");
    res.status(200).json({
      errorCode: 0,
      message: "Logout success!",
    });
  } catch (err) {
    console.log(err);
  }
};
const handleGetAllUser = async (req, res) => {
  const users = await getAllUserService();

  return res.status(200).json({
    errorCode: 0,
    errorMessage: "Successfull to get all users",
    users: users,
  });
};
const handleGetOneUser = async (req, res) => {
  const user = await getAUserService(req.query.id);

  return res.status(200).json({
    errorCode: 0,
    errorMessage: "Successfull to get a user",
    user: user,
  });
};
const handleCreateUserController = async (req, res) => {
 
  const user = await addNewUserService(req.body);
  
  return res.status(200).json(user);
};
const handleRemoveAUserController = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errorCode: 2,
      errorMessage: "missing input",
    });
  }
  const message = await removeAUserService(req.body.id);
  return res.status(200).json(message);
};
const handleUpdateAUserController = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errorCode: 2,
      errorMessage: "missing input",
    });
  }

  const message = await updateUser(req.body);
  return res.status(200).json(message);
};
const handleAuthFetchMeController = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { id: req.user.id } });
    if (!user) return res.sendStatus(401);
    res.status(200).json({ errCode: 0, message: "get a user", user: user });
  } catch (error) {}
};
const handleRefreshTokenController = async (req, res) => {
  //let cookies = req.cookies;
  const refresh_token = req.body.refresh_token;

  if (!refresh_token)
    return res.status(401).json({
      errorCode: 3,
      errorMessage: "You must Login!",
    });

  try {
    const data = verifyRefreshToken(refresh_token);
    const refreshToken = createRefreshToken(data);
    const accessToken = createJWT(data);
    updateRefreshTokenService(data, refreshToken);
    res.status(200).json({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handleLoginController,
  handleLogoutController,
  handleGetAllUser,
  handleGetOneUser,
  handleCreateUserController,
  handleRemoveAUserController,
  handleUpdateAUserController,
  handleAuthFetchMeController,
  handleRefreshTokenController,
};
