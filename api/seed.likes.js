const Like = require("./models/like");

const likeCount = 25; // total likes to create (adjust as needed)

// i have a feeling these timestamps are created by mongoDB
// Optional: deterministic timestamp range
const baseDate = new Date("2025-08-01T09:00:00Z");

function randomDateOffset(index) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + index);
  return date;
}

async function seedLikes(users, posts) {
  await Like.deleteMany({});

  const likesToInsert = [];

  for (let i = 0; i < likeCount; i++) {
    const user = users[i % users.length];
    const post = posts[i % posts.length];

    likesToInsert.push({
      user: user._id,
      post_id: post._id,
      createdAt: randomDateOffset(i)
    });
  }

  const likes = await Like.insertMany(likesToInsert);
  return likes;
}

module.exports = seedLikes;
