const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const configViewEngine = require("./config/viewEngine");
const initWebRoute = require("./routes/web");
const testConnection = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const port = process.env.PORT || 3000;
configViewEngine(app);
initWebRoute(app);
testConnection();
app.use((req, res) => {
  res.send("404 not found");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
