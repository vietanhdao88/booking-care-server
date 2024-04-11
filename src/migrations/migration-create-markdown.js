"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Markdowns", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      contentHTML: { type: Sequelize.TEXT("long") },
      contentMarkdown: { type: Sequelize.TEXT("long") },
      doctorId: { type: Sequelize.INTEGER },
      specialityId: { type: Sequelize.INTEGER },
      clinicId: { type: Sequelize.INTEGER },
      introduction: { type: Sequelize.TEXT("long") },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Markdowns");
  },
};
