const {
  handlePostNewScheduleService,
  handleGetScheduleService,
} = require("../service/scheduleService");

const handlePostNewScheduleController = async (req, res) => {
  try {
   
    const response = await handlePostNewScheduleService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleGetScheduleController = async (req, res) => {
  try {
   
    const response = await handleGetScheduleService(
      req.query.doctorId,
      req.query.date
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};

module.exports = {
  handlePostNewScheduleController,
  handleGetScheduleController,
};
