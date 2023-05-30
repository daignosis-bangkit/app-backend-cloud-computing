const express = require("express");
const { messageControllers } = require("../controllers");
const routers = express.Router();
const { auth } = require("../helper/authToken");

routers.post("/:session_id", auth, messageControllers.get);

module.exports = routers;
