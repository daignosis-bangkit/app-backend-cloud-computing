const express = require("express");
const { userControllers } = require("../controllers");
const routers = express.Router();
const Multer = require("multer");
const imgUpload = require("../modules/imgUpload");

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

routers.post(
  "/profile",
  multer.single("attachment"),
  imgUpload.uploadToGcs,
  userControllers.profile
);

module.exports = routers;
