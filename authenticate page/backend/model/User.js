const mongoose = require("mongoose");

// Schema define karo
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // same email do baar nahi hoga
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // minimum 6 char
    },
  },
  { timestamps: true } // createdAt & updatedAt add karega
);

// Model banake export karo
module.exports = mongoose.model("Usr", userSchema);
