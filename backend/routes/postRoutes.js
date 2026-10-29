const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Post = require("../models/Post");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const { calculateLevel } = require("../utils/level");

// Helper function to upload file buffer to Cloudinary using a stream
const streamUpload = (fileBuffer, resourceType = "auto") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "vyralix",
        resource_type: resourceType,
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error || new Error("Cloudinary upload failed"));
        }
      }
    );
    stream.end(fileBuffer);
  });
};

// 1. CREATE POST
// Protected by JWT middleware. Accepts multipart/form-data or JSON.
// If a file is uploaded, streams to Cloudinary and saves secure_url as imageUrl.
// Awards 10 XP to creator and recalculates level.
router.post(
  "/",
  protect,
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(err.statusCode || 400).json({ message: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      // Must have a file uploaded
      if (!req.file) {
        return res.status(400).json({
          message: "Please choose a file to upload.",
        });
      }

      // Determine mediaType category based on MIME type
      let mediaType = "image";
      if (req.file.mimetype.startsWith("audio/")) {
        mediaType = "audio";
      } else if (req.file.mimetype.startsWith("video/")) {
        mediaType = "video";
      } else {
        mediaType = "image";
      }

      // Upload buffer to Cloudinary using resource_type "auto"
      const uploadResult = await streamUpload(req.file.buffer, "auto");
      const imageUrl = uploadResult.secure_url;

      const postData = {
        title: req.body.title || "",
        creatorName: req.body.creatorName || req.user.name,
        creatorHandle:
          req.body.creatorHandle ||
          `@${(req.body.creatorName || "creator").toLowerCase().replace(/\s+/g, "")}`,
        contentType: req.body.contentType || "Digital Art",
        caption: req.body.caption || "",
        imageUrl: imageUrl,
        mediaType: mediaType,
        likes: Number(req.body.likes) || 0,
      };

      const post = await Post.create(postData);

      // Award 10 XP to the authenticated user and recalculate level
      const user = await User.findById(req.user.id);
      if (user) {
        user.xp = (user.xp || 0) + 10;
        user.level = calculateLevel(user.xp);
        await user.save();
      }

      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({
        message: error.message || "Failed to create post",
      });
    }
  }
);

// 2. GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// 3. GET POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// 4. UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// 5. DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.status(200).json({
      message: "Post deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
