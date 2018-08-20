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
  Object.entries(obj).forEach(([key, value]) => {
    let eval;
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
    }
    if (!eval) evalObj[key] = undefined;
    evalObj[key] = value;
  });
  // checks to see if empty object, if so set to undefined to be scrubbed later
  if (Object.keys(evalObj).length === 0 && evalObj.constructor === Object)
    evalObj = undefined;
  return evalObj;
};

module.exports = { scrubObj, validateSM };
