const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

// ── REGISTER ──────────────────────────────────────────────────────────────────
// Creates a new user account. Hashes the password before saving.
// Returns the new user object (without the password field).
const registerUser = async (req, res) => {
  // Check for validation errors from express-validator (set up in the route)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const { name, email, password } = req.body;

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user with the hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return the user but leave out the password field
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── LOGIN ─────────────────────────────────────────────────────────────────────
// Checks email and password. On success, returns a signed JWT.
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password against the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT that expires in 7 days
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET PROFILE ───────────────────────────────────────────────────────────────
// Returns the logged-in user's profile.
// req.user is set by authMiddleware after verifying the JWT.
const getUserProfile = async (req, res) => {
  try {
    // Fetch user from DB using id from the decoded token, exclude password
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
