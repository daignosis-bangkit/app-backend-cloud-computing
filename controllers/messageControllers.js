const uuid = require("uuid");
const { db } = require("../helper/configSql");

module.exports = {
  send: (socket, io, data) => {
    if (typeof data !== "object") return false;
    if (!data.session_id && !data.message) return false;

    const chat_id = uuid.v4();
    const message_date = new Date();

    db.query(
      "SELECT count(*) as total FROM tbl_session WHERE session_id = ?",
      [data.session_id],
      (err, result) => {
        if (err)
          return io.emit("error", {
            message: `Error to get session_id. Error: ${err.message}`,
          });

        if (result[0].total !== 1)
          return io.emit("error", {
            message: `Couldn't find given session id.`,
          });

        db.query(
          "INSERT INTO tbl_chat (chat_id, session_id, is_bot, message, date) VALUES (?, ?, ?, ?, ?)",
          [chat_id, data.session_id, false, data.message, message_date],
          (err, result) => {
            if (err)
              return io.emit("error", {
                message: `Error to send message. Error: ${err.message}`,
              });

            return io.emit("new_message", {
              message: data.message,
              date: message_date,
            });
          }
        );
      }
    );
  },
};
