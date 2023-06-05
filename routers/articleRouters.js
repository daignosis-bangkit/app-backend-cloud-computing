const express = require("express");
const { articleControllers } = require("../controllers");
const routers = express.Router();
const Multer = require("multer");
const imgUpload = require("../modules/imgUpload");
const { auth } = require("../helper/authToken");

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024,
});

routers.post(
  "/post",
  [multer.single("photo_article"), auth, imgUpload.uploadToGcs],
  articleControllers.postArticle
);
routers.get("/data",articleControllers.getAllarticle)
routers.get("/:id", multer.single(""), articleControllers.getArticle);
module.exports = routers;
