const nodemailer = require("nodemailer");
require("dotenv").config();
const handleBuildUrlEmail = (doctorId, token) => {
  const results = `${process.env.HOST_FRONT_END}/verify?token=${token}&doctorId=${doctorId}`;
  return results;
};
const handleSentMailService = async ({
  receiveEmail,
  time,
  date,
  patientName,
  doctorName,
  redirictUrl,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.email.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
  const info = await transporter.sendMail({
    from: '"Booking Care Clone By YueYue 👻" <vietanhdao883@.email>', // sender address
    to: receiveEmail, // list of receivers
    subject: "Xác nhận đặt lịch khám bệnh", // Subject line
    html: `<div>
    <h3>Xin chào ${patientName}</h3>
    <p>
      Bạn nhận được email này vì đã đặt lịch khám bệnh tại Booking Care
      Clone By Vanh
    </p>
    <div><b>Thời gian : ${time} - ${date}</b></div>
    <div><b>Bác sĩ : ${doctorName}</b></div>
    <p>
      Nếu các bạn đã đặt lịch khám bệnh vui lòng nhấp vào đường link bên
      dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh
    </p>
    <a href=${redirictUrl}>Confirm</a>
  </div>`, // html body
  });
};
module.exports = {
  handleSentMailService,
  handleBuildUrlEmail,
};
