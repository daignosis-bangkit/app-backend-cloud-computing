const uuid = require("uuid");
const tf = require("@tensorflow/tfjs");
const { db } = require("../helper/configSql");
const tokenizer = require("../helper/tokenizer");
const LanguageDetect = require("languagedetect");
const language = new LanguageDetect();

module.exports = {
  send: (socket, io, data) => {
    if (typeof data !== "object") return false;
    if (!data.session_id && !data.message) return false;

    let messageLanguage =
      data.language === "indonesian" || data.language === "english"
        ? data.language
        : language.detect(data.message);

    if (typeof messageLanguage === "object")
      for (languages of messageLanguage) {
        if (languages[0] === "english" || languages[0] === "indonesian") {
          messageLanguage = languages[0];
          break;
        }
      }

    let chat_id = uuid.v4();
    let message_date = new Date();

    db.query(
      `SELECT * from tbl_user User
      JOIN tbl_session Session ON User.user_id = Session.user_id
      WHERE Session.session_id = ? AND User.username = ?`,
      [data.session_id, socket.user.username],
      (err, result) => {
        if (err)
          return io.emit("error", {
            message: `Error to get session_id. Error: ${err.message}`,
          });

        if (result[0].total === 0)
          return io.emit("error", {
            message: `Couldn't find given session id.`,
          });

        db.query(
          "INSERT INTO tbl_chat VALUES (?, ?, ?, ?, ?, ?, ?)",
          [chat_id, data.session_id, false, data.message, message_date, null, null],
          async (err, result) => {
            if (err)
              return io.emit("error", {
                message: `Error to send message. Error: ${err.message}`,
              });

            io.emit("new_message", {
              message: data.message,
              date: message_date,
            });

            let jsonPrediction;
            if (
              messageLanguage === "english" ||
              messageLanguage === "indonesian"
            ) {
              const inputData = [
                await tokenizer.toInt(data.message, messageLanguage),
              ];
              const inputTensor = tf.tensor2d(inputData);
              const model = await tf.loadLayersModel(
                messageLanguage === "english"
                  ? process.env.MODEL_DESC_EN
                  : process.env.MODEL_DESC_ID
              );
              const prediction = model.predict(inputTensor);
              jsonPrediction = await tokenizer.toWord(
                prediction.arraySync(),
                messageLanguage
              );
            }

            chat_id = uuid.v4();
            message_date = new Date();

            db.query(
              "INSERT INTO tbl_chat VALUES (?, ?, ?, ?, ?, ?, ?)",
              [
                chat_id,
                data.session_id,
                true,
                jsonPrediction.message,
                message_date,
                jsonPrediction.disease,
                jsonPrediction.accuracy,
              ],
              async (err, result) => {
                return io.emit("new_message", {
                  message:
                    messageLanguage === "english" ||
                    messageLanguage === "indonesian"
                      ? await jsonPrediction.message
                      : "Oops, I can't detect your language. We only support Indonesian and English.",
                  accuracy: parseInt(jsonPrediction.accuracy * 100, 10),
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
        error: true,
        message:
          "Unprocessable entity: Session data is required but was not provided.",
      });

    db.query(
      `SELECT Chat.is_bot, Chat.message, Chat.accuracy, Chat.date from tbl_user User
      JOIN tbl_session Session ON User.user_id = Session.user_id
      JOIN tbl_chat Chat ON Session.session_id = Chat.session_id 
      WHERE Session.session_id = ? AND User.username = ?
      ORDER BY Chat.date DESC`,
      [session_id, req.user.username],
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
