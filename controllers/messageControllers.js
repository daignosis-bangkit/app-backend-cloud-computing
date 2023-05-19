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

            const inputData = [
              tokenizer.toInt(data.message),
            ];
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
};
