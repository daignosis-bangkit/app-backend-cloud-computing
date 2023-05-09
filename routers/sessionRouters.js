const express = require("express");
const routers = express.Router();
const { sessionControllers } = require("../controllers");

routers.get("/get", sessionControllers.get);

module.exports = routers;
