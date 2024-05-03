const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },

    Location: {
      type: String,
      required: true,
    },
    MobileNo: {
      type: Number,
      required: true,
      unique: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
    Github: {
      type: String,
    },
    LinkedIn: {
      type: String,
    },
    Website: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

module.exports = mongoose.model("Users", UserSchema);
