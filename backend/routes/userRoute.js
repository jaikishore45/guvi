const express = require("express");
const userController = require("../controllers/userController");
const route = express.Router();

route.get("/user/:id", userController.getUserById);

route.put("/user/:id", userController.updateUser);

route.put("/user/password/:id", userController.updatePasswordUser);

module.exports = route;
