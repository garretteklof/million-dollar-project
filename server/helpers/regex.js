const VerEx = require("verbal-expressions");

const githubUrl = VerEx()
  .startOfLine()
  .then("http")
  .maybe("s")
  .then("://")
  .maybe("www.")
  .then("github.com/")
  .anythingBut(" ")
  .endOfLine()
  .toRegExp();

const linkedInUrl = VerEx()
  .startOfLine()
  .then("http")
  .maybe("s")
  .then("://")
  .maybe("www.")
  .then("linkedin.com/")
  .maybe("in/")
  .anythingBut(" ")
  .endOfLine()
  .toRegExp();

const twitterUrl = VerEx()
  .startOfLine()
  .then("http")
  .maybe("s")
  .then("://")
  .maybe("www.")
  .then("twitter.com/")
  .anythingBut(" ")
  .endOfLine()
  .toRegExp();

const dribbbleUrl = VerEx()
  .startOfLine()
  .then("http")
  .maybe("s")
  .then("://")
  .maybe("www.")
  .then("dribbble.com/")
  .anythingBut(" ")
  .endOfLine()
  .toRegExp();

const regEx = {
  githubUrl,
  linkedInUrl,
  twitterUrl,
  dribbbleUrl
};

module.exports = { regEx };
