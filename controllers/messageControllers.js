const uuid = require("uuid");
const tf = require("@tensorflow/tfjs");
const { db } = require("../helper/configSql");
const tokenizer = require("../helper/tokenizer");
const LanguageDetect = require("languagedetect");
const language = new LanguageDetect();
const Axios = require("axios");

module.exports = {
  new: (req, res) => {
    const data = req.body;
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
      [data.session_id, req.user.username],
      (err, result) => {
        if (err)
          return res.status(500).send({
            error: true,
            message: `Internal server error: ${err.message}`,
          });

        if (result.length === 0)
          return res.status(404).send({
            error: true,
            message: `Couldn't find given session_id`,
          });

        db.query(
          "INSERT INTO tbl_chat VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            chat_id,
            data.session_id,
            false,
            data.message,
            message_date,
            null,
            null,
          ],
          async (err, result) => {
            if (err)
              return res.status(500).send({
                error: true,
                message: `Internal server error: ${err.message}`,
              });

            let location = data.cordinate;

            let clinic = [];
            let url_location = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keywoard=klinik&key=${process.env.MAP_KEY}&location=${location}&radius=1000&type=hospital&clinic`;
            await Axios.get(url_location).then((res) => {
              let out = res.data.results;
              for (let i = 0; i < out.length; i++) {
                let data = {
                  nama: out[i].name,
                  lokasi: out[i].vicinity,
                };
                clinic.push(data);
              }
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

            let recomend =
              "kami melihat beberapa rumah sakit dan klinik disekitar anda,";

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
                if (err)
                  return res.status(500).send({
                    error: true,
                    message: `Internal server error: ${err.message}`,
                  });

                return res.status(200).send({
                  error: false,
                  data: {
                    message:
                      messageLanguage === "english" ||
                      messageLanguage === "indonesian"
                        ? await jsonPrediction.message
                        : "Oops, I can't detect your language. We only support Indonesian and English.",
                    accuracy: parseInt(jsonPrediction.accuracy * 100, 10),
                    out: recomend,
                    clinic,
                    date: message_date,
                  },
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
