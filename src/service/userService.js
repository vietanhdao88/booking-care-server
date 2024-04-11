import { createJWT, createRefreshToken } from "../middlerware/jwt";
import db from "../models";
const bcrypt = require("bcrypt");
const handleLoginService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      //check email
      let isExist = await checkUserEmail(data.email);

      if (isExist) {
        // compare password
        const user = await db.User.findOne({
          where: { email: data.email },
          attributes: ["password"],
        });
        const dataUser = await db.User.findOne({
          where: { email: data.email },
          attributes: ["id", "email", "roleId", "fullName", "avatar"],
        });
        if (dataUser && dataUser.avatar) {
          dataUser.avatar = new Buffer(dataUser.avatar, "base64").toString(
            "binary"
          );
        }
        if (user) {
          const check = bcrypt.compareSync(data.password, user.password);
          // const check = handleCheckPass(data.password);
          const payload = {
            email: dataUser.email,
            roleId: dataUser.roleId,
          };

          let token = createJWT(payload);
          //set cookie
          let refresh_token = createRefreshToken(payload);
          if (check) {
            userData.errorCode = 0;
            userData.errorMessage = "You can login!";
            userData.access_token = token;
            userData.refresh_token = refresh_token;
            userData.user = {
              ...dataUser,
            };
          } else {
            userData.errorCode = 1;
            userData.errorMessage = "Password is incorrect!";
          }
        }
      } else {
        userData.errorCode = 1;
        userData.errorMessage = "Your email is not exist!";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { email: userEmail } });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleCheckPass = async (pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { password: pass } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllUserService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({
        raw: true,
        // attributes: { exclude: ["password"] },
      });

      if (users) {
        resolve(users);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAUserService = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        raw: true,
        where: { id: userId },
        // attributes: { exclude: ["password"] },
      });
      if (user) {
        resolve(user);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const hashPassWord = async (password) => {
  try {
    const salt = bcrypt.genSaltSync(10); // Generate a salt with a cost factor of 10
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};
const addNewUserService = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await checkUserEmail(userData.email);

      if (check) {
        resolve({
          errCode: 1,
          errorMessage: "Your email is exist! Please try with another email!",
        });
      } else {
        const passHashed = await hashPassWord(userData.password);
        const data = await db.User.create({
          fullName: userData.fullName,
          email: userData.email,
          password: passHashed,
          address: userData.address,
          phoneNumber: userData.phoneNumber,
          gender: userData.gender,
          roleId: userData.roleId,
          positionId: userData.positionId,
          avatar: userData.avatar,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        resolve({
          errCode: 0,
          message: "Create a new user success!",
          user: data,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const removeAUserService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: id },
      });
      if (!user) {
        resolve({
          errCode: 1,
          errorMessage: "User is not exist!",
        });
      }
      await db.User.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        message: "Delete user success",
      });
    } catch (err) {
      reject(err);
    }
  });
};
const updateUser = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userData.id },
        raw: false,
      });

      const passHashed = await hashPassWord(userData.password || user.password);

      if (user) {
        user.fullName = userData.fullName || user.fullName;
        user.email = userData.email || user.email;
        user.address = userData.address || user.address;
        user.phoneNumber = userData.phoneNumber || user.phoneNumber;
        user.gender = userData.gender || user.gender;
        user.roleId = userData.roleId || user.roleId;
        user.positionId = userData.positionId || user.positionId;
        user.avatar = userData.data || user.avatar;
        await user.save();
        resolve({
          errCode: 0,
          message: "Updated user!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const updateRefreshTokenService = async (data, refeshToken) => {
  const user = await db.User.findOne({
    where: { email: data.email },
  });

  if (user) {
    const dataUser = {
      ...user,
      refeshToken,
    };

    return dataUser;
  } else {
    console.log("error from server");
  }
};
module.exports = {
  handleLoginService,
  getAllUserService,
  getAUserService,
  addNewUserService,
  removeAUserService,
  updateUser,
  updateRefreshTokenService,
};
