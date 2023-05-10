"use strict";
const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const path = require("path");
var dateformat = require("date-format");
const pathKey = path.resolve("./serviceaccountkey.json");
var uuid = require("uuid");

// TODO: Sesuaikan konfigurasi Storage
const gcs = new Storage({
  projectId: "lukaku-386014",
  keyFilename: pathKey,
});

// TODO: Tambahkan nama bucket yang digunakan
const bucketName = "lukaku_uploaded";
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return "https://storage.googleapis.com/" + bucketName + "/" + filename;
}

let globalType = ""

function typePost(type) {
  return globalType = type
}

let ImgUpload = {};
let gcsname = ""

ImgUpload.uploadToGcs = (req, res, next,) => {
  //console.log(req.url)
  if (!req.file) return next();
  if(req.url === "/profile") {
     gcsname = req.body.username;
  } else if(req.url === "/post") {
      gcsname = "asset-"+uuid.v4();
  }
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on("error", (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on("finish", () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

module.exports = ImgUpload;
