const path = require("path");
const express = require("express");
const configViewEngine = (app) => {
  console.log(path.join("./src", "views"));
  //config view engine
  app.set("views", path.join("./src", "view"));

  app.set("view engine", "ejs");
  //config static file
  app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewEngine;
