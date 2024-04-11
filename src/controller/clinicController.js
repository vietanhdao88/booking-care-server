const {
  handleAddNewClinicService,
  handleGetAllClinicService,
  handleGetAClinicServie,
  handleRemoveAClinicServie,
  handleUpdateClinicServie,
} = require("../service/clinicService");

const handleAddNewClinicController = async (req, res) => {
  try {
    const response = await handleAddNewClinicService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleGetAllClinicController = async (req, res) => {
  try {
    const response = await handleGetAllClinicService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleGetAClinicController = async (req, res) => {
  try {
    const response = await handleGetAClinicServie(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleRemoveAClinicController = async (req, res) => {
  try {
    const response = await handleRemoveAClinicServie(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleUpdateClinicController = async (req, res) => {
  try {
    const response = await handleUpdateClinicServie(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
module.exports = {
  handleAddNewClinicController,
  handleGetAllClinicController,
  handleRemoveAClinicController,
  handleGetAClinicController,
  handleUpdateClinicController,
};
