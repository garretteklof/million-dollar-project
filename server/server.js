require("./config/config");

const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { User } = require("./models/user");
const { Convo, Message } = require("./models/chat");

const { authenticate } = require("./middleware/authenticate");
const { scrubObj, validateSM } = require("./helpers/objects");
const { generateUniqueFrag } = require("./helpers/strings");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT;
const publicPath = path.join(__dirname, "..", "public");

/***************************** USERS *****************************/

app.get("/users/me", authenticate, (req, res) => {
  res.send(res.locals.user);
});

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
    const { name, email, password } = req.body;
    let internalUrl = `${name.first.toLowerCase()}-${name.last.toLowerCase()}`;
    const usersWithSameName = await User.find({ name });
    if (usersWithSameName.length) {
      internalUrl += generateUniqueFrag(usersWithSameName.length);
    }
    const user = new User({ name, email, password, internalUrl });
    await user.save();
    const token = await user.generateAuthToken();
    res.header("x-auth", token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.get("/users/:internal_url", authenticate, async (req, res) => {
  const internalUrl = req.params.internal_url;
  try {
    const user = await User.findOne({ internalUrl });
    if (!user) res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.get("/users/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) res.status(404).send();
  try {
    const user = await User.findById(id);
    if (!user) res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.patch("/users/:id", express.json(), authenticate, async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) res.status(404).send();
  try {
    const { name, avatar, forte, password, socialMedia = {} } = req.body;
    const validSM = validateSM(socialMedia);
    let obj = { name, avatar, forte, password, socialMedia: validSM };
    const cleanBody = scrubObj(obj);
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { ...cleanBody } },
      { new: true }
    );
    if (!user) res.status(404).send();
    res.send(user);
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

/***************************** LOCATION *****************************/

app.patch(
  "/users/:id/location",
  express.json(),
  authenticate,
  async (req, res) => {
    const id = req.params.id;
    try {
      const { geo, isSharing = true } = req.body;
      const { _id, location } = await User.findByIdAndUpdate(
        id,
        { $set: { location: { geo, isSharing } } },
        { new: true }
      );
      res.send({ user_id: _id, location });
    } catch (e) {
      res.status(400).send();
    }
  }
);

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

/***************************** CHAT *****************************/

app.get("/convos", authenticate, async (req, res) => {
  try {
    const participants = req.query.participants.split(",");
    const convo = await Convo.findOne({
      participants: { $size: participants.length, $all: participants }
    });
    res.send(convo);
  } catch (e) {
    res.status(400).send();
  }
});

app.post("/convos", express.json(), authenticate, async (req, res) => {
  try {
    const { participants } = req.body;
    const convo = new Convo({ participants });
    await convo.save();
    res.send(convo);
  } catch (e) {
    res.status(400).send();
  }
});

app.get("/messages", authenticate, async (req, res) => {
  try {
    const { convoId } = req.query;
    const messages = await Message.find({ convoId });
    res.send(messages);
  } catch (e) {
    res.status(400).send();
  }
});

app.post("/messages", express.json(), authenticate, async (req, res) => {
  try {
    const { convoId, content, sender } = req.body;
    const message = new Message({ convoId, content, sender });
    await message.save();
    res.send(message);
  } catch (e) {
    res.status(400).send();
  }
});
/***************************** SOCKET.IO *****************************/

io.of("/chat").on("connection", socket => {
  socket.on("sendMessage", ({ sender, recipients, message }) => {
    console.log({ sender, recipients, message });
  });
});

/***************************** FRONTEND *****************************/

app.get("*", express.static(publicPath), (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}!`);
});
