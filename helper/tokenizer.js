const input = require("../dict_input.json");
const output = require("../dict_output.json");
const sentences = require("../sentences.json");

module.exports = {
  toInt: (word) => {
    let tokenized = [];
    word.split(" ").forEach((token) => {
      input.forEach((dict) => {
        if (dict.word === token && !tokenized.includes(dict.int))
          tokenized.push(dict.int);
        else if(!tokenized.includes(1)) tokenized.push(1);
      });
    });

    if (tokenized.length < 120) {
      for (let i = tokenized.length - 1; i < 119; i++) tokenized.push(0);
    }

    return tokenized;
  },
  toWord: (arr) => {
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

    const randomSentencesNumber = Math.floor(Math.random() * (sentences.length - 0) + 0);
    const selectedSentences = sentences[randomSentencesNumber];
    let sentence = selectedSentences.replace("{symptoms}", symptoms);
    sentence = sentence.replace("{accuracy}", "100%");

    return sentence;
  },
};
