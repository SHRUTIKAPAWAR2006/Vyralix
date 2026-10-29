const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const User = require("../models/User");
const Post = require("../models/Post");
const { calculateLevel } = require("../utils/level");

async function recalculateXP() {
  const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/FullStackProject";

  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB successfully.\n");
  } catch (err) {
    console.warn("Atlas connection failed (" + err.message + "). Trying local fallback 127.0.0.1:27017...");
    await mongoose.connect("mongodb://127.0.0.1:27017/FullStackProject", { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to local MongoDB successfully.\n");
  }

  // 1. Fetch all registered users
  const users = await User.find();
  console.log(`Found ${users.length} user(s) to process.\n`);

  for (const user of users) {
    // 2. Count posts matching creatorName equal to user.name
    // (Post schema uses 'creatorName' as creator identifier)
    const postCount = await Post.countDocuments({ creatorName: user.name });

    // 3. 10 XP per post, defaulting missing fields
    const xp = postCount * 10;
    const level = calculateLevel(xp);

    user.xp = xp;
    user.level = level;
    await user.save();

    console.log(`Updated ${user.name}: LVL ${level}, ${xp} XP (Posts: ${postCount})`);
  }

  console.log("\nXP and Level recalculation complete.");
  await mongoose.disconnect();
  process.exit(0);
}

recalculateXP().catch((err) => {
  console.error("Migration script failed:", err);
  process.exit(1);
});
