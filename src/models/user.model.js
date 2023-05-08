const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      default:" "
    },
    address: {
      type: String,
      default:" "
    },
    phone: {
      type: String,
      default:" "
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);