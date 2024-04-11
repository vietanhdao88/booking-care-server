const {
  handleAddNewSpecialityService,
  handleGetAllSpecialityService,
  handleRemoveASpecialityServie,
  handleGetASpecialityService,
  handleUpdateSpecialityServie,
} = require("../service/specialityService");

const handleAddNewSpecialityController = async (req, res) => {
  try {
    const response = await handleAddNewSpecialityService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleGetAllSpecialityController = async (req, res) => {
  try {
    const response = await handleGetAllSpecialityService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleGetASpecialityController = async (req, res) => {
  try {
    const response = await handleGetASpecialityService(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleRemoveASpecialityController = async (req, res) => {
  try {
    const response = await handleRemoveASpecialityServie(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
const handleUpdateSpecialityController = async (req, res) => {
  try {
    const response = await handleUpdateSpecialityServie(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errorMessage: "Error from Server",
    });
  }
};
module.exports = {
  handleAddNewSpecialityController,
  handleGetAllSpecialityController,
  handleRemoveASpecialityController,
  handleGetASpecialityController,
  handleUpdateSpecialityController,
};
