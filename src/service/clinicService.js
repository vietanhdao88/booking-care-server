const db = require("../models");
const handleAddNewClinicService = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(dataInput);
      if (!dataInput) {
        resolve({
          errCode: -1,
          errMessage: "Missing input parameters",
        });
      } else {
        const response = await db.Clinic.create({
          name: dataInput.name,
          address: dataInput.address,
          description: dataInput.description,
          image: dataInput.image,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        if (response) {
          resolve({
            errCode: 0,
            message: "Create new clinc success~",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Create new clinic failed~",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const handleGetAllClinicService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Clinic.findAll({});

      if (data) {
        data.map((item) => {
          if (item.image) {
            item.image = new Buffer(item.image, "base64").toString("binary");
          }
          return item;
        });
        resolve({
          errCode: 0,
          errMessage: "Get all clinic success~",
          data: data,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "get all clinic failed~",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const handleGetAClinicServie = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Clinic.findOne({
        where: { id: id },
        include: [
          {
            model: db.DoctorInfor,
            as: "doctorClinic",
          },
        ],
        nest: true,
        raw: false,
      });
      if (!data) {
        resolve({
          errCode: 1,
          errorMessage: "Clinic is not exist!",
        });
      } else {
        if (data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          message: "Get clinic success",
          data: data,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const handleRemoveAClinicServie = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Clinic.findOne({
        where: { id: id },
      });
      if (!data) {
        resolve({
          errCode: 1,
          errorMessage: "Clinic is not exist!",
        });
      }
      await db.Clinic.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        message: "Delete clinic success",
      });
    } catch (err) {
      reject(err);
    }
  });
};
const handleUpdateClinicServie = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Clinic.findOne({
        where: { id: data.id },
      });
      if (!res) {
        resolve({
          errCode: 1,
          errorMessage: "Clinic is not exist!",
        });
      }
      await db.Clinic.update(
        {
          name: data.name,
          address: data.address,
          description: data.description,
          image: data.image,
        },
        {
          where: { id: data.id },
        }
      );
      resolve({
        errCode: 0,
        message: "Update clinic success",
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
module.exports = {
  handleAddNewClinicService,
  handleGetAClinicServie,
  handleGetAllClinicService,
  handleRemoveAClinicServie,
  handleUpdateClinicServie,
};
