const { db } = require("../helper/configSql");

module.exports = {
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
      photo = req.file.cloudStoragePublicUrl;
    } else {
      res.status(500).send("empty file");
    }
    res.status(200).send("upload image success");
  },
};
