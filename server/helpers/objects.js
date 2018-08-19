const scrubObj = obj => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === "object") scrubObj(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

module.exports = { scrubObj };
