const express = require("express");
const sqlconf = require("../helper/configSql");
const mysql = require("mysql");
var uuid = require("uuid");

const connection = mysql.createConnection({
  host: sqlconf.sql_host,
  user: sqlconf.sql_user,
  database: sqlconf.sql_database,
  password: sqlconf.sql_password,
});

module.exports = {
  postarticle: (req, res) => {
    const genuuid = uuid.v4();
    let article_id = genuuid;
    let article_post = req.body.article_post;
    let category = req.body.category;
    let author = req.body.author;
    let creation_date = req.body.creation_date;
    let update_date = req.body.update_date;
    let photo_article = req.body.photo_article;

    const query =
      "INSERT INTO tbl_article (article_id, article_post, category, author, creation_date, update_date, photo_article) values (?,?,?,?,?,?,?)";
    connection.query(
      query,
      [
        article_id,
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
          res.send({ message: "Insert Successful" });
        }
      }
    );
  },
};
