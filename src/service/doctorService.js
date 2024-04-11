const db = require("../models");

const handleGetDoctorLimitService = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.findAll({
        limit: limit,
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
        where: { roleId: "R2" },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: db.AllCode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.AllCode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
      });

      if (data) {
        data.map((item) => {
          if (item.avatar) {
            item.avatar = new Buffer(item.avatar, "base64").toString("binary");
          }
          return item;
        });
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleGetAllDoctorService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: ["id", "fullName", "avatar"],
        raw: true,
      });

      if (response) {
        response.map((item) => {
          if (item.avatar) {
            item.avatar = new Buffer(item.avatar, "base64").toString("binary");
          }
          return item;
        });
        resolve({
          errorCode: 0,
          message: "Get All Doctor Success!",
          data: response,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleSaveInforDoctorService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doctorInfor = await db.DoctorInfor.create({
        doctorId: data.doctorId,
        priceId: data.priceId,
        provinceId: data.provinceId,
        paymentId: data.paymentId,
        addressClinic: data.addressClinic,
        nameClinic: data.nameClinic,
        note: data.note,
        count: +data.count,
        clinicId: data.clinicId,
        specialityId: data.specialityId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const doctorMarkdown = await db.MarkDown.create({
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
        doctorId: data.doctorId,
        specialityId: data.specialityId,
        clinicId: data.clinicId,
        introduction: data.introduction,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      resolve({
        errCode: 0,
        message: "Save Doctor Info success!",
        doctor: doctorMarkdown,
        doctor_infor: doctorInfor,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const handleUpdateInforDoctorService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doctorMarkdown = await db.MarkDown.update(
        {
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          specialityId: data.specialityId,
          clinicId: data.clinicId,
          introduction: data.introduction,
        },
        { where: { doctorId: data.doctorId } }
      );
      const doctorInfor = await db.DoctorInfor.update(
        {
          priceId: data.priceId,
          provinceId: data.provinceId,
          paymentId: data.paymentId,
          addressClinic: data.addressClinic,
          nameClinic: data.nameClinic,
          note: data.note,
          count: +data.count,
        },
        { where: { doctorId: data.doctorId } }
      );
      resolve({
        errCode: 0,
        message: "Update Doctor Info success!",
        doctorMarkdown: doctorMarkdown,
        doctorInfor: doctorInfor,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
const handleGetADoctorService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.findOne({
        where: { id: inputId, roleId: "R2" },
        include: [
          {
            model: db.MarkDown,
            attributes: ["contentMarkdown", "contentHTML", "introduction"],
          },
          {
            model: db.AllCode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.DoctorInfor,
            as: "DoctorInfor",
            attributes: {
              exclude: ["id"],
            },
            include: [
              {
                model: db.AllCode,
                as: "paymentData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.AllCode,
                as: "priceData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.AllCode,
                as: "provinceData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Clinic,
                as: "doctorClinic",
                attributes: ["id", "name"],
              },
              {
                model: db.Speciality,
                as: "doctorData",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        raw: false,
        nest: true,
        attributes: { exclude: ["password"] },
      });
      if (data && data.avatar) {
        data.avatar = new Buffer(data.avatar, "base64").toString("binary");
      }
      resolve({
        errCode: 0,
        message: "Get A doctor success",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const handleGetADoctorExtraService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: -1,
          errMessage: "Missing doctorId",
        });
      } else {
        console.log(typeof Number(inputId));
        const data = await db.DoctorInfor.findOne({
          where: { doctorId: Number(inputId) },

          include: [
            {
              model: db.AllCode,
              as: "paymentData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.AllCode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.AllCode,
              as: "provinceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Clinic,
              as: "doctorClinic",
            },
          ],
          nest: true,
          raw: false,
        });
        console.log(data);
        resolve({
          errCode: 0,
          message: "Get a doctor success",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleGetProfileDoctorService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: -1,
          errMessage: "Missing input parameters",
        });
      } else {
        const doctorInfor = await db.User.findOne({
          where: { id: inputId, roleId: "R2" },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.AllCode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.AllCode,
              as: "roleData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.DoctorInfor,
              as: "DoctorInfor",
              attributes: {
                exclude: ["id"],
              },
              include: [
                {
                  model: db.AllCode,
                  as: "paymentData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.AllCode,
                  as: "priceData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.AllCode,
                  as: "provinceData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          nest: true,
          raw: false,
        });
        if (doctorInfor && doctorInfor.avatar) {
          doctorInfor.avatar = new Buffer(
            doctorInfor.avatar,
            "base64"
          ).toString("binary");
        }
        resolve({
          errCode: 0,
          message: "Get profile doctor success",
          data: doctorInfor,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleGetAllDoctorInfor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.DoctorInfor.findAll({
        attributes: ["specialityId", "clinicId", "doctorId", "note"],
        include: [
          {
            model: db.User,
            as: "User",
            attributes: ["fullName", "address", "phoneNumber"],
          },
          {
            model: db.Clinic,
            as: "doctorClinic",
            attributes: ["name"],
          },
          {
            model: db.Speciality,
            as: "doctorData",
            attributes: ["name"],
          },
        ],
        nest: true,
        raw: false,
      });
      if (data) {
        resolve({
          message: "Get All Doctor Infor",
          data: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
module.exports = {
  handleGetDoctorLimitService,
  handleGetAllDoctorService,
  handleSaveInforDoctorService,
  handleGetADoctorService,
  handleUpdateInforDoctorService,
  handleGetADoctorExtraService,
  handleGetProfileDoctorService,
  handleGetAllDoctorInfor,
};
