const bcrypt = require("bcrypt");
const db = require("../models/index");

const getAll = async () => {
  try {
    //user lấy trong modelName của model đó
    const data = await db.User.findAll({ raw: true });
    return data;
  } catch (err) {
    console.log(err);
  }
};
const addNewUserService = async (userData) => {
  try {
    const passHashed = await hashPassWord(userData.password);
    const user = db.User.create({
      fullName: userData.fullName,
      email: userData.email,
      password: passHashed,
      address: userData.address,
      phoneNumber: userData.phoneNumber,
      gender: userData.gender === "0" ? true : false,
      roleId: userData.roleId,
      positionId: null,
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};
const getUserByIdService = async (id) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};
const hashPassWord = async (password) => {
  try {
    const salt = bcrypt.genSaltSync(10); // Generate a salt with a cost factor of 10
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};
const updateUserService = async (userData) => {
  try {
    const passHashed = await hashPassWord(userData.password);
    const user = db.User.update(
      {
        fullName: userData.fullName,
        email: userData.email,
        password: passHashed,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        gender: userData.gender,
        roleId: userData.roleId,
        positionId: null,
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        where: {
          id: userData.id,
        },
      }
    );
    return user;
  } catch (err) {
    console.log(err);
  }
};
const deleteUserService = async (id) => {
  try {
    const deletedUser = await db.User.destroy({ where: { id: id } });
    return deletedUser;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getAll,
  addNewUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};
