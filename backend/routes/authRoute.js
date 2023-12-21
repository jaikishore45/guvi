const express = require("express");
const authControllers = require("../controllers/authController");
const route = express.Router();

//signup
route.post("/signup", authControllers.signup);
//login
route.post("/login", authControllers.login);

module.exports = route;
