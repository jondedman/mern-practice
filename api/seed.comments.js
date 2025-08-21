const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");
require("dotenv").config();


const CommentContents = [
  { text: "Nice plan, but have you considered sharks with lasers?", createdAt: new Date("2025-08-01T09:00:00Z") },
  { text: "Classic villain move!", createdAt: new Date("2025-08-02T10:30:00Z") },
  { text: "Minions never listen, do they?", createdAt: new Date("2025-08-03T11:45:00Z") },
  { text: "LOL, been there!", createdAt: new Date("2025-08-04T13:15:00Z") },
  { text: "I should try that next time.", createdAt: new Date("2025-08-05T14:00:00Z") },
  { text: "World domination is harder than it looks.", createdAt: new Date("2025-08-06T09:20:00Z") },
  { text: "Anyone else tired of capes?", createdAt: new Date("2025-08-07T18:00:00Z") },
  { text: "Good luck with your evil scheme!", createdAt: new Date("2025-08-08T20:15:00Z") },
  { text: "That’s one way to do it!", createdAt: new Date("2025-08-09T08:45:00Z") },
  { text: "I always forget to feed the minions.", createdAt: new Date("2025-08-10T12:30:00Z") },
  { text: "Let me know how it goes!", createdAt: new Date("2025-08-11T14:10:00Z") },
  { text: "Villain brunch next week?", createdAt: new Date("2025-08-12T16:45:00Z") },
  { text: "That’s nothing, I lost a whole volcano once.", createdAt: new Date("2025-08-13T09:55:00Z") },
  { text: "Evil plans over coffee are the best.", createdAt: new Date("2025-08-14T11:25:00Z") },
  { text: "My robot army agrees.", createdAt: new Date("2025-08-15T15:00:00Z") },
  { text: "Anyone else’s lair get cold at night?", createdAt: new Date("2025-08-16T17:35:00Z") },
  { text: "Good one!", createdAt: new Date("2025-08-17T12:50:00Z") },
  { text: "I’ll bring snacks next time.", createdAt: new Date("2025-08-18T19:10:00Z") }
];

async function seedComments(users, posts) {
  await Comment.deleteMany({});

  // Assign each comment to a random user and post
  const commentsToInsert = CommentContents.map((comment, i) => ({
    text: comment.text,
    createdAt: comment.createdAt,
    author: users[i % users.length]._id,
    post_id: posts[i % posts.length]._id,
  }));

  await Comment.insertMany(commentsToInsert);
  return commentsToInsert;
}

module.exports = seedComments;

async function seedComments(users, posts) {
  await Comment.deleteMany({});

  // Assign each comment to a random user and post
  const commentsToInsert = CommentContents.map((comment, i) => ({
    text: comment.text,
    createdAt: comment.createdAt,
    author: users[i % users.length]._id,
    post_id: posts[i % posts.length]._id,
  }));

  await Comment.insertMany(commentsToInsert);
  return commentsToInsert;
}

module.exports = seedComments;