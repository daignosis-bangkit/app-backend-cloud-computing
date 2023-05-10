const uuid = require("uuid");
const { db } = require("../helper/configSql");

module.exports = {
  new: (socket, io, data) => {
    if (typeof data !== "object") return false;
    if (!data.username) return false;

    const session_id = uuid.v4();
    db.query(
      "SELECT user_id FROM tbl_user WHERE username = ?",
      [data.username],
      (err, result) => {
        if (err)
          return io.emit("error", {
            message: `Error to get user_id. Error: ${err.message}`,
          });

        db.query(
          "INSERT INTO tbl_session (session_id, user_id) VALUES (?, ?)",
          [session_id, result[0].user_id],
          (err, result) => {
            if (err)
              return io.emit("error", {
                message: `Error to crete session. Error: ${err.message}`,
              });

            io.emit("success", {
              message: "Room created!",
            });
            return io.emit("created_session", {
              session_id,
              room: data.username,
            });
          }
        );
      }
    );
  },
  get: (res, req) => {},
};
