const { handleGetAllCodeService } = require("../service/allcodeService");

const handleGetAllCodeController = async (req, res) => {
  try {
    const type = req.query.type;

    const data = await handleGetAllCodeService(type);
    return res.status(200).json({
      errCode: 0,
      message: "Success to get all code",
      data: data,
    });
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleGetAllCodeController,
};
