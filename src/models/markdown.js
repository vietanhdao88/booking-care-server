"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MarkDown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MarkDown.belongsTo(models.User, {
        foreignKey: "doctorid",
      });
    }
  }
  MarkDown.init(
    {
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
      doctorId: DataTypes.INTEGER,
      specialityId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      introduction: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "MarkDown",
    }
  );
  return MarkDown;
};
