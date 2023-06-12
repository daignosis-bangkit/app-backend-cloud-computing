const express = require("express");
const routers = express.Router();
const { sessionControllers } = require("../controllers");
const { auth } = require("../helper/authToken");

routers.post("/", auth, sessionControllers.get);
routers.post("/new", auth, sessionControllers.new);

module.exports = routers;
