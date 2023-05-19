const CryptoJs = require("crypto-js");
const uuid = require("uuid");

const { createToken } = require("../helper/createToken");
const { db } = require("../helper/configSql");

module.exports = {
  register: (req, res) => {
    let { username, email, password } = req.body;
    if (!username && !email && !password)
      return res.status(422).send({
        message: "Unprocessable entity",
        error: "Login data is required but was not provided.",
      });
    const user_id = uuid.v4();
    const address_id = uuid.v4();
    const registration_date = new Date();
    password = CryptoJs.MD5(password + process.env.PASS_KEY).toString();
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
          "INSERT INTO tbl_user (user_id, username, password, email, creation_date) VALUES (?, ?, ?, ?, ?); INSERT INTO tbl_address (user_id, address_id, address, city, province, postal_code, country) VALUES (?, ?, ?, ?, ?,?,?)",
          [
            user_id,
            username,
            password,
            email,
            registration_date,
            user_id,
            address_id,
            "",
            "",
            "",
            0,
            "",
          ],
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
  login: (req, res) => {
    let { email, password } = req.body;
    if (!email && !password)
      return res.status(422).send({
        message: "Unprocessable entity",
        error: "Login data is required but was not provided.",
      });

    password = CryptoJs.MD5(password + process.env.PASS_KEY).toString();
    db.query(
      "SELECT * FROM tbl_user WHERE email = ? && password = ?",
      [email, password],
      (err, result) => {
        if (err)
          return res.status(500).send({
            message: "Internal server error",
            error: err.message,
          });

        if (result.length !== 1)
          return res.status(200).send({
            message: "Unauthorized",
            error: "Wrong password or email is not registered",
          });

        let dataUser = JSON.parse(JSON.stringify(result[0]));
        delete dataUser.user_id;
        delete dataUser.password;
        delete dataUser.creation_date;

        const token = createToken(dataUser);

        return res.status(200).send({
          message: "Login success",
          data: dataUser,
          token,
        });
      }
    );
  },
  keepLogin: (req, res) => {
    let {username, email} = req.user;

    db.query(
      "SELECT * FROM tbl_user WHERE username = ? AND email = ?",
      [username, email],
      (err, result) => {
        if (err)
          return res.status(500).send({
            message: "Internal server error",
            error: err.message,
          });

        if (result.length !== 1)
          return res.status(200).send({
            message: "Unauthorized",
            error: "Wrong password or email is not registered",
          });

        let dataUser = JSON.parse(JSON.stringify(result[0]));
        delete dataUser.user_id;
        delete dataUser.password;
        delete dataUser.creation_date;

        const token = createToken(dataUser);

        return res.status(200).send({
          message: "Login success",
          data: dataUser,
          token,
        });
      }
    );
  },
  updateProfile: (req, res) => {
    const ext = /\.(jpg|jpeg|png|JPG|PNG|JPEG)/;
    let imageUrl = "";
    let userid = req.body.user_id;
    let username = req.body.username;
    let password = req.body.password;
    let fullname = req.body.full_name;
    let phonenumber = req.body.phone_number;
    let email = req.body.email;
    let birthday = req.body.birthday;
    let address = req.body.address;
    let city = req.body.city;
    let province = req.body.province;
    let postal_code = req.body.postal_code;
    let country = req.body.country;
    const query =
      "UPDATE tbl_user SET username = ?, password = ?, full_name = ?, phone_number = ?, email = ?, birthday = ?, photo_profile = ? WHERE user_id = ?; UPDATE tbl_address SET address=?, city=?, province=?, postal_code=?, country=? where user_id=?";
    //security filter for exploit upload file
    if (req.file && req.file.cloudStoragePublicUrl) {
      if (
        !req.file.mimetype.includes("image/") &&
        !req.file.originalname.match(ext)
      ) {
        res.status(500).send("error file");
      }
      photo = req.file.cloudStoragePublicUrl;
    } else {
      res.status(500).send("empty file");
    }
    db.query(
      query,
      [
        username,
        password,
        fullname,
        phonenumber,
        email,
        birthday,
        photo,
        userid,
        address,
        city,
        province,
        postal_code,
        country,
        userid,
      ],
      (err, rows, fields) => {
        if (err) {
          res.status(500).send({ message: err.sqlMessage });
        } else {
          res.send({ message: "Update Successful" });
        }
      }
    );
  },
  getProfile: (req, res) => {
    const user_id = req.body.user_id;

    db.query(
      "SELECT * from tbl_user JOIN tbl_address ON  tbl_user.user_id=tbl_address.user_id where tbl_user.user_id=?",
      [user_id],
      (err, result) => {
        let dataUser = JSON.parse(JSON.stringify(result[0]));
        if (err) {
          res.status(500).send({ message: err.sqlMessage });
        } else {
          res.send(dataUser);
        }
      }
    );
  },
};
