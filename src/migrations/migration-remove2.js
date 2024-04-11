module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.removeColumn("doctorinfors", "nameClinic", {
      /* query options */
    });
  },
};
