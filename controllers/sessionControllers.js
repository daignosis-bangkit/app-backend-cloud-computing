const uuid = require("uuid");
const { db } = require("../helper/configSql");

module.exports = {
  new: (req, res) => {
    const session_id = uuid.v4();
    db.query(
      "SELECT user_id FROM tbl_user WHERE username = ?",
      [req.user.username],
      (err, result) => {
        if (err)
          return res.status(500).send({
            error: true,
            message: `Internal server error: ${err.message}`,
          });

        db.query(
          "INSERT INTO tbl_session VALUES (?, ?)",
          [session_id, result[0].user_id],
          (err, result) => {
            if (err)
              return res.status(500).send({
                error: true,
                message: `Internal server error: ${err.message}`,
              });

            return res.status(200).send({
              error: false,
              data: { session_id },
            });
          }
        );
      }
    );
  },
  get: (req, res) => {
    db.query(
      `SELECT Session.session_id, Chat.message, Chat.is_bot, Chat.date AS latest_chat_date
      FROM tbl_user User
      JOIN tbl_session Session ON User.user_id = Session.user_id
      JOIN tbl_chat Chat ON Session.session_id = Chat.session_id
      JOIN (
          SELECT session_id, MAX(date) AS max_date
          FROM tbl_chat
          GROUP BY session_id
      ) AS T ON Chat.session_id = T.session_id AND Chat.date = T.max_date
      WHERE User.username = ? 
      ORDER BY Chat.date DESC`,
      [req.user.username],
      (err, result) => {
        if (err)
          return res.status(500).send({
            error: true,
            message: `Internal server error: ${err.message}`,
          });

        return res.status(200).send({
          error: false,
          data: result,
        });
      }
    );
  },
};
