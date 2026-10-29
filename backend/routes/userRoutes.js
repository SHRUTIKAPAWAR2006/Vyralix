const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Post = require("../models/Post");
const { calculateLevel } = require("../utils/level");

// ── GET /api/user/profile ─────────────────────────────────────────────────────
// Protected route — returns real logged-in user profile, XP, level, and post count.
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Keep level in sync with XP based on progression formula
    const realLevel = calculateLevel(user.xp || 0);
    if (user.level !== realLevel) {
      user.level = realLevel;
      await user.save();
    }

    // Count posts created by this user (matched on creatorName)
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

// ── GET /api/user/dashboard ───────────────────────────────────────────────────
// Protected route — any logged-in user (user OR admin) can access this.
// protect verifies the JWT and attaches req.user before this handler runs.
router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({
    message: "Welcome to the protected dashboard",
    user: req.user, // decoded JWT payload: { id, role, iat, exp }
  });
});

// ── GET /api/user/admin ───────────────────────────────────────────────────────
// Admin-only route — protect verifies the token, authorize checks the role.
// Returns 403 if the logged-in user is not an admin.
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome Admin! You can access this page.",
  });
});

module.exports = router;
