const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

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
