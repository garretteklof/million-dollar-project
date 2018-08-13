const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const token = req.header("x-auth");
  try {
    const user = await User.findByToken(token);
    if (!user) {
      throw new Error();
    }
    res.locals.user = user;
    res.locals.token = token;
    next();
  } catch (e) {
    res.status(401).send();
  }
};

module.exports = { authenticate };
