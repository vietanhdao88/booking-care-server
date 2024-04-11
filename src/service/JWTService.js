const db = require("../models");

const getUserRole = async (user) => {
  const roles = db.AllCode.findAll({
    where: { type: "Role" },
  });

};
module.exports = {
  getUserRole,
};
