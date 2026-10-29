const multer = require("multer");

// Use in-memory storage so file buffer is directly streamed to Cloudinary
const storage = multer.memoryStorage();

// Allowed MIME types per specification
const allowedTypes = [
  // Images
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  // Audio
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  // Video
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error(
      `Unsupported file type: ${file.mimetype}. Allowed types are: JPEG, PNG, GIF, WEBP, MP3, WAV, OGG, MP4, WEBM, MOV.`
    );
    error.statusCode = 400;
    cb(error, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
  fileFilter,
});

module.exports = upload;
