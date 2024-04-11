const express = require("express");
const {
  testWebController,
  getCRUDPage,
  getUserController,
  addNewUserController,
  updateUserController,
  deleteUserController,
  getUpdateUserPage,
} = require("../controller/webController");
const {
  handleLoginController,
  handleGetAllUser,
  handleGetOneUser,
  handleCreateUserController,
  handleRemoveAUserController,
  handleUpdateAUserController,
  handleLogoutController,
  handleAuthFetchMeController,
  handleRefreshTokenController,
} = require("../controller/userController");
const {
  handleGetAllCodeController,
} = require("../controller/allcodeController");

const { checkUserJWT, checkPermission } = require("../middlerware/jwt");
const {
  handleGetDoctorLimitController,
  handleGetAllDoctorController,
  handleSaveInforDoctorController,
  handleGetADoctorController,
  handleUpdateInforDoctorController,
  handleGetADoctorExtraController,
  handleGetDoctorProfileController,
  handleGetAllDoctorInforController,
} = require("../controller/doctorController");
const {
  handlePostNewScheduleController,
  handleGetScheduleController,
} = require("../controller/scheduleController");
const {
  handleBookingPatientController,
  handleVerifyAppointMentController,
  handleGetAllPatientController,
  handleCancelBookingController,
  handleVerifyBookingController,
  handleGetAllPatientCancelController,
  handleGetAllVerifyPatientController,
} = require("../controller/patientController");
const {
  handleAddNewSpecialityController,
  handleGetAllSpecialityController,
  handleRemoveASpecialityController,
  handleGetASpecialityController,
  handleUpdateSpecialityController,
} = require("../controller/specialityController");
const {
  handleRemoveAClinicController,
  handleUpdateClinicController,
  handleGetAClinicController,
  handleGetAllClinicController,
  handleAddNewClinicController,
} = require("../controller/clinicController");

const router = express.Router();

const initWebRoute = (app) => {
  router.all("*", checkUserJWT, checkPermission);
  router.get("/", testWebController);
  router.get("/crud", getCRUDPage);
  router.get("/detail-user", getUserController);
  router.post("/add-user", addNewUserController);
  router.get("/update-user", getUpdateUserPage);
  router.post("/update-user", updateUserController);
  router.get("/delete-user", deleteUserController);
  router.post("/api/signin", handleLoginController);
  router.post("/api/logout", handleLogoutController);
  router.post("/api/signup", () => {
    console.log("register test");
  });
  router.get("/api/users", handleGetAllUser);
  router.get("/api/user", handleGetOneUser);
  router.post("/api/user", handleCreateUserController);
  router.delete("/api/user", handleRemoveAUserController);
  router.put("/api/user", handleUpdateAUserController);
  router.get("/api/allcode", handleGetAllCodeController);
  router.get("/api/me", handleAuthFetchMeController);
  router.get("/api/doctor", handleGetDoctorLimitController);
  router.get("/api/all-doctor", handleGetAllDoctorController);
  router.post("/api/info-doctor", handleSaveInforDoctorController);
  router.put("/api/info-doctor", handleUpdateInforDoctorController);
  router.post("/api/refresh-token", handleRefreshTokenController);
  router.get("/api/detail-doctor", handleGetADoctorController);
  router.post("/api/add-new-schedule", handlePostNewScheduleController);
  router.get("/api/get-schedule-doctor", handleGetScheduleController);
  router.get("/api/get-extra-doctor", handleGetADoctorExtraController);
  router.get("/api/get-profile-doctor", handleGetDoctorProfileController);
  router.post("/api/booking-patient", handleBookingPatientController);
  router.post("/api/verify-appointment", handleVerifyAppointMentController);
  router.post("/api/add-speciality", handleAddNewSpecialityController);
  router.get("/api/specialities", handleGetAllSpecialityController);
  router.get("/api/speciality", handleGetASpecialityController);
  router.put("/api/update-speciality", handleUpdateSpecialityController);
  router.delete("/api/remove-speciality", handleRemoveASpecialityController);
  router.post("/api/add-clinic", handleAddNewClinicController);
  router.get("/api/clinics", handleGetAllClinicController);
  router.get("/api/clinic", handleGetAClinicController);
  router.put("/api/update-clinic", handleUpdateClinicController);
  router.delete("/api/remove-clinic", handleRemoveAClinicController);
  router.get("/api/patients", handleGetAllPatientController);
  router.put("/api/cancel-booking", handleCancelBookingController);
  router.put("/api/verify-booking", handleVerifyBookingController);
  router.get("/api/get-verify-patient", handleGetAllVerifyPatientController);
  router.get("/api/get-cancel-patient", handleGetAllPatientCancelController);
  router.get("/api/get-doctor-infor", handleGetAllDoctorInforController);
  return app.use("/", router);
};

module.exports = initWebRoute;
