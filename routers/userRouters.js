const express = require("express");
const routers = express.Router();
const { userControllers } = require("../controllers");

routers.post("/register", userControllers.register);

module.exports = routers;
