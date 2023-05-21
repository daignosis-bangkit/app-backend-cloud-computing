const input_en = require("../dict_input_en.json");
const input_id = require("../dict_input_en.json");
const output = require("../dict_output_en.json");
const sentences = require("../sentences.json");

module.exports = {
  toInt: (word, language) => {
    let input;
    if (language === "english") input = input_en;
    else if (language === "indonesian") input = input_id;
    let tokenized = [];
    word.split(" ").forEach((token) => {
      input.forEach((dict) => {
        if (
          dict.word === token &&
          token !== "<OOV>" &&
          !tokenized.includes(dict.int) &&
          dict.int <= 999
        )
          tokenized.push(dict.int);
        else if (!tokenized.includes(1)) tokenized.push(1);
      });
    });

    if (tokenized.length < 120) {
      for (let i = tokenized.length - 1; i < 119; i++) tokenized.push(0);
    }

    return tokenized;
  },
  toWord: (arr, language) => {
    const tokenized = arr[0].slice();
    const sorted = arr[0].sort(function (a, b) {
      return b - a;
    });
    let highestProbIndex;
    tokenized.forEach((token, i) => {
      if (token === sorted[0]) highestProbIndex = i;
    });

    let symptoms;
    output.forEach((dict) => {
      if (dict.int === highestProbIndex) symptoms = dict.symptoms;
    });

    const randomSentencesNumber = Math.floor(
      Math.random() * (sentences.english.length - 0) + 0
    );
    let sentence = language === "english" ? sentences.english : sentences.indonesian
    const selectedSentences = sentence[randomSentencesNumber];
    sentence = selectedSentences.replace("{symptoms}", symptoms);
    sentence = sentence.replace("{accuracy}", "100%");

    return sentence;
  },
};
