const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Post = require("../models/Post");
const { protect } = require("../middleware/authMiddleware");
const { calculateLevel } = require("../utils/level");

// ── POST /api/auth/register ───────────────────────────────────────────────────
// Creates a new user. Accepts name, email, password, and optional role.
// Returns the created user (without the password).
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user — role defaults to "user" if not provided
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Respond with user info — never include the password
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
// Authenticates a user. Returns a JWT token on success.
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Use a generic message to avoid revealing which field is wrong
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT — includes user id and role, expires in 1 hour
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── GET /api/auth/profile ─────────────────────────────────────────────────────
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const realLevel = calculateLevel(user.xp || 0);
    if (user.level !== realLevel) {
      user.level = realLevel;
      await user.save();
    }

    const postCount = await Post.countDocuments({ creatorName: user.name });

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      xp: user.xp || 0,
      level: user.level || 1,
      createdAt: user.createdAt,
      postCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
