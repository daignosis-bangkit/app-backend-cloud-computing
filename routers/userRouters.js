const express = require("express");
const { userControllers } = require("../controllers");
const routers = express.Router();
const Multer = require("multer");
const imgUpload = require("../modules/imgUpload");
const { auth } = require("../helper/authToken");

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

routers.patch(
  "/profile",
  [multer.single("photo_profile"), auth, imgUpload.uploadToGcs],
  userControllers.updateProfile
);

routers.post("/register", multer.single(""), userControllers.register);

routers.post("/login", userControllers.login);
routers.patch("/keep-login", auth, userControllers.keepLogin);

routers.post("/get-profile", [multer.single(""), auth], userControllers.getProfile);
routers.post("/forgot-password", [multer.single("")], userControllers.forgotPassword)

module.exports = routers;
