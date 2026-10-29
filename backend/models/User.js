const mongoose = require("mongoose");

// Schema for storing user account info
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // This field stores the HASHED password, never plain text
    password: {
      type: String,
      required: true,
    },
    // Role controls what the user can access (Exp 6)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // Experience points and Level (Real User Progression)
    xp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
