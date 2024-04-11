const db = require("../models");
require("dotenv").config();
const moment = require("moment");

const handlePostNewScheduleService = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      const scheduleExist = await db.Schedule.findOne({
        where: {
          doctorId: dataInput.doctorID,
          date: dataInput.date,
          timeType: dataInput.timeType,
        },
      });
      if (scheduleExist && scheduleExist.length > 0) {
        scheduleExist = scheduleExist.map((item) => {
          item.date = new Date(item.date).getTime();
          return item;
        });
      }
      if (scheduleExist && scheduleExist.length > 0) {
        resolve({
          errorCode: 1,
          message: "Schedule you choose could be exist",
        });
      } else {
        const data = await db.Schedule.create({
          currentNumber: dataInput.currentNumber,
          maxNumber: process.env.MAX_NUMBER_PATIENT,
          timeType: dataInput.timeType,
          doctorId: dataInput.doctorID,
          date: dataInput.date,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        if (data) {
          resolve({
            errorCode: 0,
            message: "Create new Schedule",
            schedule: data,
          });
        }
      }
    } catch (error) {
     
      reject(error);
    }
  });
};
const handleGetScheduleService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      const currentDate = moment(new Date())
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
     
     
      if (date === "undefined") {
        data = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: currentDate },
          include: [
            {
              model: db.AllCode,
              as: "timeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["fullName"],
            },
          ],
          raw: true,
          nest: true,
        });
       
      } else {
        data = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: date },
          include: [
            {
              model: db.AllCode,
              as: "timeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["fullName"],
            },
          ],
          raw: true,
          nest: true,
        });
      }

      if (data) {
        resolve({
          errorCode: 0,
          message: "Get schedule",
          schedule: data,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  handlePostNewScheduleService,
  handleGetScheduleService,
};
