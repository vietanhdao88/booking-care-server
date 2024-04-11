const db = require("../models");

const handleAddNewSpecialityService = (res) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!res) {
        resolve({
          errCode: -1,
          errMessage: "Missing input parameters",
        });
      } else {
        const data = await db.Speciality.create({
          name: res.name,
          description: res.description,
          image: res.image,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        if (data) {
          resolve({
            errCode: 0,
            message: "Create new speciality success~",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Create new speciality failed~",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const handleGetAllSpecialityService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Speciality.findAll({});

      if (data) {
        data.map((item) => {
          if (item.image) {
            item.image = new Buffer(item.image, "base64").toString("binary");
          }
          return item;
        });
        resolve({
          errCode: 0,
          errMessage: "Get all speciality success~",
          data: data,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "get all speciality failed~",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const handleGetASpecialityService = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      if (location === "ALL" || location === "undefined") {
        data = await db.Speciality.findOne({
          where: { id: inputId },
          include: [
            {
              model: db.DoctorInfor,
              as: "doctorData",
            },
          ],
          nest: true,
          raw: false,
        });
      } else {
        data = await db.Speciality.findOne({
          where: { id: inputId },
          include: [
            {
              model: db.DoctorInfor,
              as: "doctorData",
              where: { provinceId: location },
            },
          ],
          nest: true,
          raw: false,
        });
      }

      if (data) {
        if (data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }

        resolve({
          errCode: 0,
          errMessage: "Get a speciality success~",
          data: data,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "get a speciality failed~",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const handleRemoveASpecialityServie = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Speciality.findOne({
        where: { id: id },
      });
      if (!data) {
        resolve({
          errCode: 1,
          errorMessage: "Speciality is not exist!",
        });
      }
      await db.Speciality.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        message: "Delete speciality success",
      });
    } catch (err) {
      reject(err);
    }
  });
};
const handleUpdateSpecialityServie = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Speciality.findOne({
        where: { id: data.id },
      });
      if (!res) {
        resolve({
          errCode: 1,
          errorMessage: "Speciality is not exist!",
        });
      }
      await db.Speciality.update(
        {
          name: data.name,
          description: data.description,
          image: data.image,
        },
        {
          where: { id: data.id },
        }
      );
      resolve({
        errCode: 0,
        message: "Update speciality success",
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
module.exports = {
  handleAddNewSpecialityService,
  handleGetAllSpecialityService,
  handleRemoveASpecialityServie,
  handleGetASpecialityService,
  handleUpdateSpecialityServie,
};
