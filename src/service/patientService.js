const db = require("../models");
import { v4 as uuidv4 } from "uuid";
const {
  handleSentMailService,
  handleBuildUrlEmail,
} = require("./sentMailService");
const handleBookingPatientService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: -1,
          errMessage: "Missing input parameters",
        });
      } else {
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            fullName: data.fullName,
            address: data.address,
            phoneNumber: data.phoneNumber,
          },
        });

        const token = uuidv4();
        await handleSentMailService({
          receiveEmail: data.email,
          time: data.time,
          patientName: data.fullName,
          date: data.date,
          doctorName: data.doctorName,
          redirictUrl: handleBuildUrlEmail(data.doctorId, token),
        });

        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        }

        resolve({
          errCode: 0,
          message: "Upsert infor patient success!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const handleSubmitVerifyEmail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: -1,
          errMessage: "Missing input parameters",
        });
      } else {
        const appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            message: "verify successs!",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Lịch hẹn đã được xác nhận hoặc không tồn tại",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const handleGetAllPatientService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: -1,
          errMessage: "Missing input parameters",
        });
      } else {
        const appointment = await db.Booking.findAll({
          where: {
            doctorId: data.doctorId,
            statusId: "S1",
          },
          include: [
            {
              model: db.User,
              as: "patientData",
            },
            {
              model: db.AllCode,
              as: "timeTypeData",
              attributes: ["valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });

        resolve({
          data: appointment,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const handleCancelPatientService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await db.Booking.findOne({
        where: { token: token, statusId: "S1" },
        raw: false,
      });
      console.log(booking);
      if (booking) {
        booking.statusId = "S4";
        await booking.save();
        resolve({
          errCode: 0,
          message: "Cancel booking successs!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const handleVerifyPatientService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await db.Booking.findOne({
        where: { token: token, statusId: "S1" },
        raw: false,
      });
      console.log(booking);
      if (booking) {
        booking.statusId = "S2";
        await booking.save();
        resolve({
          errCode: 0,
          message: "Verify booking successs!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const handleGetAllPatientVerifyService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: -1,
          errMessage: "Missing input parameters",
        });
      } else {
        const appointment = await db.Booking.findAll({
          where: {
            doctorId: doctorId,
            statusId: "S2",
          },
          include: [
            {
              model: db.User,
              as: "patientData",
            },
            {
              model: db.AllCode,
              as: "timeTypeData",
              attributes: ["valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });

        resolve({
          data: appointment,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
const handleGetAllPatientCancelService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: -1,
          errMessage: "Missing input parameters",
        });
      } else {
        const appointment = await db.Booking.findAll({
          where: {
            doctorId: doctorId,
            statusId: "S4",
          },
          include: [
            {
              model: db.User,
              as: "patientData",
            },
            {
              model: db.AllCode,
              as: "timeTypeData",
              attributes: ["valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });

        resolve({
          data: appointment,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};
module.exports = {
  handleBookingPatientService,
  handleGetAllPatientService,
  handleSubmitVerifyEmail,
  handleCancelPatientService,
  handleVerifyPatientService,
  handleGetAllPatientVerifyService,
  handleGetAllPatientCancelService,
};
