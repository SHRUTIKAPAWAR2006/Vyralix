const jwt = require("jsonwebtoken");

// ── AUTH MIDDLEWARE ───────────────────────────────────────────────────────────
// Reads the JWT from the Authorization header (format: "Bearer <token>"),
// verifies it, and attaches the decoded user info to req.user.
// If the token is missing or invalid, the request is blocked with 401.
const authMiddleware = (req, res, next) => {
  // Read the Authorization header
  const authHeader = req.headers.authorization;

  // Check that the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Extract the token part after "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to the request so the next handler can use it
    req.user = decoded;

    next(); // Pass control to the next middleware / route handler
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
