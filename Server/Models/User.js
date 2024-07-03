const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  savedCities: [
    {
      nombre: String,
      lat: String,
      lon: String,
    },
  ],
  preferences: {
    units: String,
    theme: String,
    animation: Boolean,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
