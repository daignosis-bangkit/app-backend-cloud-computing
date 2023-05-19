const input = require("../dict_input.json");
const output = require("../dict_output.json");

module.exports = {
  toInt: (word) => {
    let tokenized = [];
    word.split(" ").forEach((token) => {
      input.forEach((dict) => {
        if (dict.word === token) tokenized.push(dict.int);
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

    return symptoms;
  },
};
