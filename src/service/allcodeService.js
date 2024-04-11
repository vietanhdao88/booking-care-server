const db = require("../models");

const handleGetAllCodeService = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = {};

      const data = await db.AllCode.findAll({
        where: { type: dataInput },
        raw: true,
      });

      res.errorCode = 0;
      res.data = data;
      resolve(data);
    } catch (res) {
      console.log(error);
    }
  });
};
module.exports = {
  handleGetAllCodeService,
};
