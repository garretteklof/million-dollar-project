require("./config/config");

const path = require("path");
const express = require("express");

const { mongoose } = require("./db/mongoose");
const { User } = require("./models/user");

const app = express();
const port = process.env.PORT;
const publicPath = path.join(__dirname, "..", "public");

/***************************** USERS *****************************/

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send();
  }
});

app.post("/users", express.json(), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

/***************************** FRONTEND *****************************/

app.get("*", express.static(publicPath), (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}!`);
});
