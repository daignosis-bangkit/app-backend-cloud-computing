const uuid = require("uuid");
const { db } = require("../helper/configSql");

module.exports = {
  postArticle: (req, res) => {
    const genuuid = uuid.v4();
    let article_id = genuuid;
    let article_post = req.body.article_post;
    let category = req.body.category;
    let author = req.body.author;
    let creation_date = new Date();
    let update_date = req.body.update_date;
    let photo_article = "";
    let article_name = req.body.article_name;

    const query =
      "INSERT INTO tbl_article (article_id, article_name, article_post, category, author, creation_date, update_date, photo_article) VALUES (?,?,?,?,?,?,?,?);";
    if (req.file && req.file.cloudStoragePublicUrl) {
      if (
        !req.file.mimetype.includes("image/") &&
        !req.file.originalname.match(ext)
      ) {
        res.status(500).send({ messge: "error file", error: true });
      }
      photo_article = req.file.cloudStoragePublicUrl;
    } else {
      res.status(500).send({ message: "empty file", error: true });
    }
    db.query(
      query,
      [
        article_id,
        article_name,
        article_post,
        category,
        author,
        creation_date,
        update_date,
        photo_article,
      ],
      (err, rows, fields) => {
        if (err) {
          res.status(500).send({ message: err.sqlMessage });
        } else {
          res.send({ message: "Insert Successful", err: false });
        }
      }
    );
  },
  getArticle: (req, res) => {
    let article_id = req.params.id;

    db.query(
      "SELECT * from tbl_article where article_id=?",
      [article_id],
      (err, result) => {
        data = result[0];
        if (err) {
          res.status(500).send({ message: err.sqlMessage, error: true });
        } else {
          res.send({ data, error: false });
        }
      }
    );
  },

  getAllarticle: (req, res) => {
    let limit = 5;
    if (req.query.limit) {
      limit = parseInt(req.query.limit,10);
    }
    db.query("select * from tbl_article ORDER BY creation_date limit ?",
    [limit],
      (err, result) => {
        //console.log(result[0])
        data = result;
        if (err) {
          res.status(500).send({ message: err.sqlMessage, error: true });
        } else {
          res.send({ data, error: false });
        }
      }
    );
  },
};
