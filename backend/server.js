const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ── SECURITY MIDDLEWARE (Exp 5) ───────────────────────────────────────────────

// helmet sets secure HTTP response headers automatically
app.use(helmet());

// Rate limiter: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: "Too many requests, please try again later" },
});
app.use(limiter);

// ── EXISTING MIDDLEWARE (Exp 4) ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── DATABASE CONNECTION ───────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

// ── ROUTES ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Full Stack API is Running");
});

// Exp 4 — posts
app.use("/api/posts", postRoutes);

// Exp 5 — users profile (kept for backward compatibility)
// Exp 6 — auth (register + login with role)
app.use("/api/auth", authRoutes);

// Exp 6 — protected routes (dashboard + admin-only)
app.use("/api/user", userRoutes);

// ── START SERVER ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
