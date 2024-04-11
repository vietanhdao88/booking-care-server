const {
  handleGetDoctorLimitService,
  handleGetAllDoctorService,
  handleSaveInforDoctorService,
  handleGetADoctorService,
  handleUpdateInforDoctorService,
  handleGetADoctorExtraService,
  handleGetProfileDoctorService,
  handleGetAllDoctorInfor,
} = require("../service/doctorService");

const handleGetDoctorLimitController = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  const data = await handleGetDoctorLimitService(+limit);

  return res.status(200).json({
    errorCode: 0,
    errorMessage: "Successfull to get doctor",
    doctor: data,
  });
};
const handleGetAllDoctorController = async (req, res) => {
  try {
    const data = await handleGetAllDoctorService();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleSaveInforDoctorController = async (req, res) => {
  try {
    const response = await handleSaveInforDoctorService(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleUpdateInforDoctorController = async (req, res) => {
  try {
    const response = await handleUpdateInforDoctorService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log("err");
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleGetADoctorController = async (req, res) => {
  try {
    const id = req.query.doctorId;
    if (!id) {
      return res.status(200).json({
        errorCode: -1,
        errorMessage: "Missing input",
      });
    }

    const response = await handleGetADoctorService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from server",
    });
  }
};
const handleGetADoctorExtraController = async (req, res) => {
  try {
    const id = req.query.doctorId;

    if (!id) {
      return res.status(200).json({
        errorCode: -1,
        errorMessage: "Missing input",
      });
    }
    const response = await handleGetADoctorExtraService(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from server",
    });
  }
};
const handleGetDoctorProfileController = async (req, res) => {
  try {
    const id = req.query.doctorId;
    if (!id) {
      return res.status(200).json({
        errorCode: -1,
        errorMessage: "Missing input",
      });
    }

    const response = await handleGetProfileDoctorService(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from server",
    });
  }
};
const handleGetAllDoctorInforController = async (req, res) => {
  try {
    const response = await handleGetAllDoctorInfor();
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({
      message: "Error from server~",
    });
  }
};
module.exports = {
  handleGetDoctorLimitController,
  handleGetAllDoctorController,
  handleSaveInforDoctorController,
  handleGetADoctorController,
  handleUpdateInforDoctorController,
  handleGetADoctorExtraController,
  handleGetDoctorProfileController,
  handleGetAllDoctorInforController,
};
