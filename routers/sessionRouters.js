const express = require("express");
const routers = express.Router();
const { sessionControllers } = require("../controllers");
const { auth } = require("../helper/authToken");

routers.get("/", auth, sessionControllers.get);

module.exports = routers;
