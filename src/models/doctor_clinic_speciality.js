"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Clinic_Speciality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor_Clinic_Speciality.init(
    {
      doctorId: DataTypes.INTEGER,
      Doctor_Clinic_SpecialityId: DataTypes.INTEGER,
      specialityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_Clinic_Speciality",
    }
  );
  return Doctor_Clinic_Speciality;
};
