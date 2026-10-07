const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// ── VALIDATION RULES for /register ───────────────────────────────────────────
const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

// 1. POST /api/users/register — create a new user account
router.post("/register", registerValidation, registerUser);

// 2. POST /api/users/login — log in and receive a JWT
router.post("/login", loginUser);

// 3. GET /api/users/profile — protected; returns the logged-in user's profile
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
