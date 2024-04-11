const jwt = require("jsonwebtoken");
require("dotenv").config();
const nonSecurePaths = [
  "/api/signin",
  "/api/signup",
  // "/api/logout",
  // "/api/user",
  // "/api/doctor",
  // "/api/all-doctor",
  // "/api/info-doctor",
  // "/api/detail-doctor",
  // "/api/get-schedule-doctor",
  // "/api/get-extra-doctor",
  // "/api/verify-appointment",
  // "/api/add-speciality",
  // "/api/speciality",
  // "/api/patients",
  "/api/cancel-booking",
  "/api/verify-booking",
];
const createJWT = (payload) => {
  let token = "";
  try {
    token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
  } catch (error) {
    console.log(error);
  }
  return token;
};
const createRefreshToken = (payload) => {
  let token = "";
  try {
    token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN); //
  } catch (error) {
    console.log(error);
  }
  return token;
};
const verifyToken = (token) => {
  let data = null;
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    data = decoded;
  } catch (error) {
    console.log(error);
  }

  return data;
};
const verifyRefreshToken = (token) => {
  let data = null;
  try {
    let decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    data = decoded;
  } catch (error) {
    console.log(error);
  }

  return data;
};
const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    const token = cookies.jwt;
    const decoded = verifyToken(token);

    if (decoded) {
      //gan bien vao req
      //cho req co user

      req.user = decoded;

      next();
    } else {
      return res.status(401).json({
        errCode: 1,
        errMessage: "No Authentication ? You must be login!",
      });
    }
  } else {
    return res.status(401).json({
      errCode: 1,
      errMessage: "No Authentication ? You must be login!",
    });
  }
};
const checkPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  if (req.user) {
    const role = req.user.roleId;

    const roles = ["R1", "R2", "R3"];
    const canAccess = roles.some((item) => item === role);

    if (roles && roles.length <= 0) {
      return res.status(403).json({
        errCode: -1,
        errMessage: "You don't permission to access this resource",
      });
    }
    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        errCode: -1,
        errMessage: "You don't permission to access this resource",
      });
    }
  } else {
    return res.status(401).json({
      errCode: 1,
      errMessage: "No Authentication ? You must be login!",
    });
  }
};
module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkPermission,
  createRefreshToken,
  verifyRefreshToken,
};
