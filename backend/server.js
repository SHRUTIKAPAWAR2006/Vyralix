const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Render (and most hosts) sit behind a reverse proxy; trust it so
// express-rate-limit sees the real client IP instead of the proxy's.
app.set("trust proxy", 1);

// ── ALLOWED FRONTEND ORIGINS (Exp 10) ─────────────────────────────────────────
// FRONTEND_URL = deployed Vercel URL, e.g. https://your-app.vercel.app
// http://localhost:5173 is always allowed for local development.
const allowedOrigins = ["http://localhost:5173"];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ""));
}

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
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// ── DATABASE CONNECTION ───────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/FullStackProject")
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

// ── WEBSOCKET / SOCKET.IO SERVER (Exp 8) ──────────────────────────────────────
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: allowedOrigins }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Receive a chat message from one client and send it to everyone
  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// ── START SERVER ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
