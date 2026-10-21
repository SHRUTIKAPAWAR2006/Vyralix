const jwt = require("jsonwebtoken");

// ── protect ───────────────────────────────────────────────────────────────────
// Reads and verifies the JWT from the Authorization header.
// Expected format: "Bearer <token>"
// On success, attaches the decoded payload to req.user and calls next().
// On failure, returns 401.
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Extract the token part after "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info (id, role) to the request object
    req.user = decoded;

    next(); // Token is valid — pass control to the next handler
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ── authorize(...roles) ───────────────────────────────────────────────────────
// Returns middleware that checks whether req.user.role is in the allowed list.
// Use AFTER protect, since protect sets req.user.
// Example: authorize("admin") — only admins get through.
const authorize = (...roles) => {
  return (req, res, next) => {
    // If the user's role is not in the allowed list, deny access
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission.",
      });
    }
    next(); // Role is allowed — continue
  };
};

module.exports = { protect, authorize };
