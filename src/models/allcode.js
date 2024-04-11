"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class allCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      allCode.hasMany(models.User, {
        foreignKey: "positionId",
        as: "positionData",
      });
      allCode.hasMany(models.User, {
        foreignKey: "gender",
        as: "genderData",
      });
      allCode.hasMany(models.User, {
        foreignKey: "roleId",
        as: "roleData",
      });
      allCode.hasMany(models.Schedule, {
        foreignKey: "timeType",
        as: "timeData",
      });
      allCode.hasMany(models.DoctorInfor, {
        foreignKey: "paymentId",
        as: "paymentData",
      });
      allCode.hasMany(models.DoctorInfor, {
        foreignKey: "provinceId",
        as: "provinceData",
      });
      allCode.hasMany(models.DoctorInfor, {
        foreignKey: "priceId",
        as: "priceData",
      });
      allCode.hasMany(models.Booking, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });
    }
  }
  allCode.init(
    {
      type: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      valueVi: DataTypes.STRING,
      valueEn: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AllCode",
    }
  );
  return allCode;
};
