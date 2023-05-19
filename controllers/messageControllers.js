const uuid = require("uuid");
const tf = require("@tensorflow/tfjs");
const { db } = require("../helper/configSql");
const tokenizer = require("../helper/tokenizer");

let model;
tf.loadLayersModel(process.env.MODEL)
  .then((loadedModel) => {
    model = loadedModel;
    console.log("Model loaded successfully");
  })
  .catch((err) => {
    console.log("Failed to load model:", err);
  });

module.exports = {
  send: (socket, io, data) => {
    if (typeof data !== "object") return false;
    if (!data.session_id && !data.message) return false;

    let chat_id = uuid.v4();
    let message_date = new Date();

    db.query(
      "SELECT * from tbl_user User JOIN tbl_session Session ON User.user_id = Session.user_id WHERE Session.session_id = ? AND User.username = ?",
      [data.session_id, socket.user.username],
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
          "INSERT INTO tbl_chat VALUES (?, ?, ?, ?, ?)",
          [chat_id, data.session_id, false, data.message, message_date],
          (err, result) => {
            if (err)
              return io.emit("error", {
                message: `Error to send message. Error: ${err.message}`,
              });

            io.emit("new_message", {
              message: data.message,
              date: message_date,
            });

            const inputData = [tokenizer.toInt(data.message)];
            const inputTensor = tf.tensor2d(inputData);
            const prediction = model.predict(inputTensor);
            const jsonPrediction = tokenizer.toWord(prediction.arraySync());

            chat_id = uuid.v4();
            message_date = new Date();

            db.query(
              "INSERT INTO tbl_chat VALUES (?, ?, ?, ?, ?)",
              [chat_id, data.session_id, true, jsonPrediction, message_date],
              (err, result) => {
                return io.emit("new_message", {
                  message: jsonPrediction,
                  date: message_date,
                });
              }
            );
          }
        );
      }
    );
  },
  get: (req, res) => {
    let { session_id } = req.params;
    if (!session_id)
      return res.status(422).send({
        message: "Unprocessable entity",
        error: "Session data is required but was not provided.",
      });

    db.query(
      "SELECT Chat.is_bot, Chat.message, Chat.date from tbl_user User JOIN tbl_session Session ON User.user_id = Session.user_id JOIN tbl_chat Chat ON Session.session_id = Chat.session_id WHERE Session.session_id = ? AND User.username = ?",
      [session_id, req.user.username],
      (err, result) => {
        if (err)
          return res.status(500).send({
            message: "Internal server error",
            error: err.message,
          });

        return res.status(200).send({
          data: result,
        });
      }
    );
  },
};
