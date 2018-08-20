const { regEx } = require("./regex");

const scrubObj = obj => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === "object") scrubObj(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

const validateSM = obj => {
  let evalObj = {};
  for (let [key, value] of Object.entries(obj)) {
    let eval;
    if (value) {
      switch (key) {
        case "github":
          eval = regEx.githubUrl.test(value);
          break;
        case "linkedIn":
          eval = regEx.linkedInUrl.test(value);
          break;
        case "twitter":
          eval = regEx.twitterUrl.test(value);
          break;
        case "dribbble":
          eval = regEx.dribbbleUrl.test(value);
          break;
      }
      if (!eval) value = undefined;
    }
    evalObj[key] = value;
  }
  return evalObj;
};

module.exports = { scrubObj, validateSM };
