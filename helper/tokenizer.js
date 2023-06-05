const Axios = require("axios");

module.exports = {
  toInt: async (word, language) => {
    let input;
    if (language === "english") {
      input = await Axios.get(process.env.DICT_INPUT_EN);
      input = input.data;
    } else if (language === "indonesian") {
      input = await Axios.get(process.env.DICT_INPUT_ID);
      input = input.data;
    }
    input = input.map((i) => i.word);

    let tokenized = [];
    word.split(" ").forEach((token) => {
      const tokenIndex = input.indexOf(token);
      if (tokenIndex > 0) tokenized.push(tokenIndex + 1);
      else tokenized.push(1);
    });

    if (tokenized.length < 120)
      for (let i = tokenized.length; i < 120; i++) tokenized.push(0);
    
    return tokenized;
  },
  toWord: async (arr, language) => {
    const tokenized = arr[0].slice();
    const sorted = arr[0].sort((a, b) => {
      return b - a;
    });
    let highestProbIndex;
    tokenized.forEach((token, i) => {
      if (token === sorted[0]) highestProbIndex = i;
    });

    let symptoms;
    let output = await Axios.get(process.env.DICT_OUTPUT_DESC_EN);
    output.data.forEach((dict) => {
      if (dict.int === highestProbIndex) symptoms = dict.symptoms;
    });

    const sentences = await Axios.get(process.env.SENTENCES);
    const randomSentencesNumber = Math.floor(
      Math.random() * (sentences.data.english.length - 0) + 0
    );
    let sentence =
      language === "english"
        ? sentences.data.english
        : sentences.data.indonesian;
    const selectedSentences = sentence[randomSentencesNumber];
    sentence = selectedSentences.replace("{symptoms}", symptoms);

    return sentence;
  },
};
