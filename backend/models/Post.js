const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    creatorName: {
      type: String,
      required: true
    },
    creatorHandle: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    },
    caption: {
      type: String
    },
    imageUrl: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", postSchema);
