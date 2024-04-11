"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Speciality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Speciality.hasMany(models.DoctorInfor, {
        foreignKey: "specialityId",
        as: "doctorData",
      });
    }
  }
  Speciality.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Speciality",
    }
  );
  return Speciality;
};
