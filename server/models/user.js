const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  locationCoordinates: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  const user = this;
  const { _id, email, locationCoordinates } = user.toObject();
  return { _id, email, locationCoordinates };
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET)
    .toString();
  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeAuthToken = function(token) {
  const user = this;
  return user.update({
    $pull: {
      tokens: { token }
    }
  });
};

UserSchema.methods.updateLocation = function() {
  const user = this;
  return user.update({});
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded = undefined;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;
  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }
    return bcrypt
      .compare(password, user.password)
      .then(res => {
        if (res) {
          return Promise.resolve(user);
        }
        return Promise.reject();
      })
      .catch(e => Promise.reject(e));
  });
};

UserSchema.pre("save", function(next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
const User = mongoose.model("User", UserSchema);

module.exports = { User };
