require("./config/config");

const path = require("path");
const express = require("express");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { User } = require("./models/user");

const { authenticate } = require("./middleware/authenticate");

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
    const { firstName, lastName, email, password } = req.body;
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    const token = await user.generateAuthToken();
    res.header("x-auth", token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.delete("/users/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  try {
    const user = await User.findByIdAndRemove({ id });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(res.locals.user);
});

/***************************** LOCATION *****************************/

app.patch("/location", express.json(), authenticate, async (req, res) => {
  try {
    const { lat, lng, isSharing = true } = req.body;
    const { location } = await User.findByIdAndUpdate(
      res.locals.user._id,
      { $set: { location: { geo: { lat, lng }, isSharing } } },
      { new: true }
    );
    res.send(location);
  } catch (e) {
    res.status(400).send();
  }
});

/***************************** AUTH *****************************/

app.post("/login", express.json(), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.header("x-auth", token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.delete("/logout", authenticate, async (req, res) => {
  try {
    await res.locals.user.removeAuthToken(res.locals.token);
    res.status(200).send();
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
