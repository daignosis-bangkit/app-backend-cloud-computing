const express = require("express");
const { userControllers } = require("../controllers");
const routers = express.Router();
const Multer = require("multer");
const imgUpload = require("../modules/imgUpload");

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

routers.patch(
  "/profile",
  multer.single("photo_profile"),
  imgUpload.uploadToGcs,
  userControllers.updateProfile
);

routers.post("/register", multer.single(""), userControllers.register);

routers.post("/login", userControllers.login);

routers.get("/profile", multer.single(""), userControllers.getProfile);

module.exports = routers;
