/**
 * XP-to-Level Calculation Utility (Vyralix)
 *
 * Rules:
 * - Level 1: 0 XP
 * - Level 2: 50 XP
 * - Level 3: 150 XP
 * - Each next level needs 100 more XP than the previous threshold
 *   (Level 4: 250 XP, Level 5: 350 XP, etc.)
 */

function calculateLevel(xp = 0) {
  if (xp < 50) return 1;
  return Math.floor((xp - 50) / 100) + 2;
}

/**
 * Calculates level, current XP within the level, next level target XP,
 * and progress percentage for the UI progress bar.
 *
 * Example: 70 total XP -> Level 2, 20 XP into current level,
 * 100 XP to complete level 2 ("20 / 100 XP", 20%).
 */
function getLevelProgress(xp = 0) {
  const level = calculateLevel(xp);
  let currentLevelThreshold = 0;
  let nextLevelThreshold = 50;

  if (level === 1) {
    currentLevelThreshold = 0;
    nextLevelThreshold = 50;
  } else {
    currentLevelThreshold = 50 + (level - 2) * 100;
    nextLevelThreshold = 50 + (level - 1) * 100;
  }

  const currentXP = Math.max(0, xp - currentLevelThreshold);
  const nextLevelXP = nextLevelThreshold - currentLevelThreshold;
  const percentage = Math.min(
    100,
    Math.max(0, Math.round((currentXP / nextLevelXP) * 100))
  );

  return {
    level,
    currentXP,
    nextLevelXP,
    percentage,
    totalXP: xp,
  };
}

module.exports = { calculateLevel, getLevelProgress };
