const {
  handleSubmitVerifyEmail,
  handleGetAllPatientService,
  handleBookingPatientService,
  handleCancelPatientService,
  handleVerifyPatientService,
  handleGetAllPatientVerifyService,
  handleGetAllPatientCancelService,
} = require("../service/patientService");
const handleBookingPatientController = async (req, res) => {
  try {
    const response = await handleBookingPatientService(req.body);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};
const handleVerifyAppointMentController = async (req, res) => {
  try {
    const response = await handleSubmitVerifyEmail(req.body);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};
const handleGetAllPatientController = async (req, res) => {
  try {
    const response = await handleGetAllPatientService(req.query);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};
const handleCancelBookingController = async (req, res) => {
  try {
    const response = await handleCancelPatientService(req.query.token);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};
const handleVerifyBookingController = async (req, res) => {
  try {
    const response = await handleVerifyPatientService(req.query.token);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};
const handleGetAllVerifyPatientController = async (req, res) => {
  try {
    const response = await handleGetAllPatientVerifyService(req.query.doctorId);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};
const handleGetAllPatientCancelController = async (req, res) => {
  try {
    const response = await handleGetAllPatientCancelService(req.query.doctorId);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handleBookingPatientController,
  handleVerifyAppointMentController,
  handleGetAllPatientController,
  handleCancelBookingController,
  handleVerifyBookingController,
  handleGetAllPatientCancelController,
  handleGetAllVerifyPatientController,
};
