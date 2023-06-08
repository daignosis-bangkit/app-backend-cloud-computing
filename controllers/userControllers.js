const CryptoJs = require("crypto-js");
const uuid = require("uuid");
const randomstring = require("randomstring");
const transporter = require("../helper/nodemailer");

const { createToken } = require("../helper/createToken");
const { db } = require("../helper/configSql");

module.exports = {
  register: (req, res) => {
    let { username, email, password } = req.body;
    if (!username && !email && !password)
      return res.status(422).send({
        error: true,
        message:
          "Unprocessable entity: Login data is required but was not provided.",
      });
    const user_id = uuid.v4();
    const address_id = uuid.v4();
    const photo_url = "https://storage.googleapis.com/lukaku_uploaded/blank-profile-picture-hd-images-photo-5.JPG"
    const registration_date = new Date();
    password = CryptoJs.MD5(password + process.env.PASS_KEY).toString();
    db.query(
      "SELECT count(*) as total FROM tbl_user WHERE username = ? OR email = ?",
      [username, email],
      (err, result) => {
        if (err)
          return res.status(500).send({
            error: true,
            message: `Internal server error: ${err.message}`,
          });

        if (result[0].total !== 0)
          return res.status(400).send({
            error: true,
            message: "Username or email already exists",
          });
        db.query(
          `INSERT INTO tbl_user (
            user_id, 
            username, 
            password, 
            email, 
            photo_profile,
            creation_date) 
          VALUES (?, ?, ?, ?, ?, ?); 
          INSERT INTO tbl_address (
            user_id, 
            address_id, 
            address, 
            city, 
            province, 
            postal_code, 
            country) 
          VALUES (?, ?, ?, ?, ?,?,?)`,
          [
            user_id,
            username,
            password,
            email,
            "https://storage.googleapis.com/lukaku_uploaded/blank-profile-picture-hd-images-photo-5.JPG",
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
                error: true,
                message: `Internal server error: ${err.message}`,
              });

            return res.status(200).send({
              error: false,
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
        error: true,
        message:
          "Unprocessable entity: Login data is required but was not provided.",
      });

    password = CryptoJs.MD5(password + process.env.PASS_KEY).toString();
    db.query(
      "SELECT * FROM tbl_user WHERE email = ? && password = ?",
      [email, password],
      (err, result) => {
        if (err)
          return res.status(500).send({
            error: true,
            message: `Internal server error: ${err.message}`,
          });

        if (result.length !== 1)
          return res.status(401).send({
            error: true,
            message: `Unauthorized: Wrong password or email is not registered`,
          });

        let dataUser = JSON.parse(JSON.stringify(result[0]));
        delete dataUser.password;
        delete dataUser.creation_date;

        const token = createToken(dataUser);

        return res.status(200).send({
          error: false,
          message: "Login success",
          data: {
            ...dataUser,
            token,
          },
        });
      }
    );
  },
  keepLogin: (req, res) => {
    let { username, email } = req.user;

    db.query(
      "SELECT * FROM tbl_user WHERE username = ? AND email = ?",
      [username, email],
      (err, result) => {
        if (err)
          return res.status(500).send({
            error: true,
            message: `Internal server error: ${err.message}`,
          });

        if (result.length !== 1)
          return res.status(401).send({
            error: true,
            message: "Unauthorized: Wrong password or email is not registered",
          });

        let dataUser = JSON.parse(JSON.stringify(result[0]));
        delete dataUser.user_id;
        delete dataUser.password;
        delete dataUser.creation_date;

        const token = createToken(dataUser);

        return res.status(200).send({
          error: false,
          message: "Login success",
          data: {
            ...dataUser,
            token,
          },
        });
      }
    );
  },
  updateProfile: (req, res) => {
    const ext = /\.(jpg|jpeg|png|JPG|PNG|JPEG)/;
    let imageUrl = "";
    let userid = req.user.user_id;
    let username = req.user.username;
    let password = CryptoJs.MD5(req.body.password + process.env.PASS_KEY).toString()
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
      "UPDATE tbl_user SET username = ?, password = ?, full_name = ?, phone_number = ?, email = ?, birthday = ?, photo_profile = ? WHERE username = ?; UPDATE tbl_address SET address=?, city=?, province=?, postal_code=?, country=? where user_id=?";
    //security filter for exploit upload file
    if (req.file && req.file.cloudStoragePublicUrl) {
      if (
        !req.file.mimetype.includes("image/") &&
        !req.file.originalname.match(ext)
      ) {
        res.status(500).send({message: "error file", error:true});
      }
      photo = req.file.cloudStoragePublicUrl;
    } else {
      res.status(500).send({message: "empty file", error: true});
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
        username,
        address,
        city,
        province,
        postal_code,
        country,
        userid,
      ],
      (err, rows, fields) => {
        if (err) {
          res.status(500).send({ error: true, message: err.sqlMessage });
        } else {
          res.send({ message: "Update Successful", error: false});
        }
      }
    );
  },
  getProfile: (req, res) => {
    const user_id = req.user.user_id;
    db.query(
      "SELECT * from tbl_user JOIN tbl_address ON  tbl_user.user_id=tbl_address.user_id where tbl_user.user_id=?",
      [user_id],
      (err, result) => {
        let dataUser = JSON.parse(JSON.stringify(result[0]));
        console.log(dataUser)
        if (err) {
          res.status(500).send({ message: err.sqlMessage, error: true });
        } else {
          res.send({dataUser, error: false});
        }
      }
    )
  },
  forgotPassword: (req, res) => {
    let { username } = req.body;
    db.query(
      "SELECT * FROM tbl_user where username = ?",
      [username],
      (err, result) => {
        if (err) {
          res.status(500).send({ user_valid: false, error: true });
        } else {
          if (result.length > 0) {
            let dataUser = JSON.parse(JSON.stringify(result[0]));
            let mailku = dataUser.email;
            let genpassword = randomstring.generate(10);
            let password = CryptoJs.MD5(
              genpassword + process.env.PASS_KEY
            ).toString();

            let formatmail = {
              from: "Admin daignosis.id@gmail.com",
              to: mailku,
              subject: `New Password`,
              html: `Hello ${username} this your new password you can login now with this password ${genpassword}`,
            };

            transporter.sendMail(formatmail, (errMail, resMail) => {
              if (errMail) {
                res.status(500).send({ message: errMail, err: errMail, error: true });
              } else {
                db.query(
                  "UPDATE tbl_user SET password = ? where username = ?",
                  [password, username],
                  (err, result) => {
                    if (err) {
                      res.status(500).send({ message: err.sqlMessage, error: true });
                    } else {
                      res.send({
                        messages: `Check your new password on ${mailku}`,
                        error: false,
                      });
                    }
                  }
                );
              }
            });
          } else {
            res.send({ messages: "Invalid account", error: true });
          }
        }
      }
    );
  },
};
