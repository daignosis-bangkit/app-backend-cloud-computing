const CryptoJs = require("crypto-js");
const uuid = require("uuid");
const { db } = require("../helper/configSql");

module.exports = {
  register: (req, res) => {
    let { username, email, password } = req.body;
    const user_id = uuid.v4();
    const registration_date = new Date();

    password = CryptoJs.MD5(password).toString();
    db.query(
      "SELECT count(*) as total FROM tbl_user WHERE username = ? OR email = ?",
      [username, email],
      (err, result) => {
        if (err)
          return res.status(500).send({
            message: "Internal server error",
            error: err.message,
          });

        if (result[0].total !== 0)
          return res.status(400).send({
            message: "Username or email already exists",
          });

        db.query(
          "INSERT INTO tbl_user (user_id, username, password, email, creation_date) VALUES (?, ?, ?, ?, ?)",
          [user_id, username, password, email, registration_date],
          (err, result) => {
            if (err)
              return res.status(500).send({
                message: "Internal server error",
                error: err.message,
              });

            return res.status(200).send({
              message: "Registration succeed",
              data: {
                username,
                email,
              },
            });
          }
        );
      }
    );
  },
  profile: (req, res) => {
    const ext = /\.(jpg|jpeg|png|JPG|PNG|JPEG)/;
    let imageUrl = "";
    let userid = req.body.user_id;
    let username = req.body.username;
    let password = req.body.password;
    let fullname = req.body.full_name;
    let phonenumber = req.body.phone_number;
    let email = req.body.email;
    let birthday = req.body.birthday;
    let creation_date = req.body.creation_date;

    //security filter for exploit upload file
    if (req.file && req.file.cloudStoragePublicUrl) {
      if (
        !req.file.mimetype.includes("image/") &&
        !req.file.originalname.match(ext)
      ) {
        res.status(500).send("error file");
      }
      imageUrl = req.file.cloudStoragePublicUrl;
    } else {
      res.status(500).send("empty file");
    }
    res.status(200).send("upload image success");
  },
};
