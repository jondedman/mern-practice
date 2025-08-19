const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
require("dotenv").config();


const postContents = [
  { message: "Just because you’re plotting world domination doesn’t mean you can’t stop to smell the roses… then genetically enhance them to spit acid.", createdAt: new Date("2025-08-01T09:00:00Z") },
  { message: "Feeling cute, might vaporize the moon later, idk.", createdAt: new Date("2025-08-02T10:30:00Z") },
  { message: "Sometimes the greatest battles are fought in silence… and sometimes with a death ray. :sparkles:", createdAt: new Date("2025-08-03T11:45:00Z") },
  { message: "Anyone know a good dry cleaner for cape soot? Asking for a friend.", createdAt: new Date("2025-08-04T13:15:00Z") },
  { message: "Spent the day at the beach with my henchmen. Sand got everywhere… especially in the giant robot joints.", createdAt: new Date("2025-08-05T14:00:00Z") },
  { message: "Your worth isn’t defined by your failures… unless you fail to annihilate your nemesis. Then, yes, that’s on you.", createdAt: new Date("2025-08-06T09:20:00Z") },
  { message: "Date night with my beloved sidekick :heart: We poisoned the wine together. #CoupleGoals", createdAt: new Date("2025-08-07T18:00:00Z") },
  { message: "Nothing like a quiet evening reading by candlelight… in the ruins of my enemies’ lair.", createdAt: new Date("2025-08-08T20:15:00Z") },
  { message: "Power is taken, not given. Unless it’s gift-wrapped with a lovely bow, in which case thank you Karen for the blender!", createdAt: new Date("2025-08-09T08:45:00Z") },
  { message: "Ran into my old arch-nemesis at the grocery store. Awkward.", createdAt: new Date("2025-08-10T12:30:00Z") },
  { message: "Be the change you wish to see in the world. Or just change the world to your liking. Both work.", createdAt: new Date("2025-08-11T14:10:00Z") },
  { message: "Is it weird to feel nostalgic about your first volcano lair?", createdAt: new Date("2025-08-12T16:45:00Z") },
  { message: "Don’t let small minds convince you your plans are too big.", createdAt: new Date("2025-08-13T09:55:00Z") },
  { message: "Sunday fun day! We robbed a train AND had brunch.", createdAt: new Date("2025-08-14T11:25:00Z") },
  { message: "Sometimes I think my doomsday device is the only one who understands me.", createdAt: new Date("2025-08-15T15:00:00Z") },
  { message: "You’re never too old to start a new hobby… like summoning eldritch horrors.", createdAt: new Date("2025-08-16T17:35:00Z") },
  { message: "Anyone else’s minions keep eating their lunch from the lair fridge??", createdAt: new Date("2025-08-17T12:50:00Z") },
  { message: "It’s okay to outgrow people. Especially when you grow into a 30-foot mech suit.", createdAt: new Date("2025-08-18T19:10:00Z") }
];

async function seedPosts(users) {
  await Post.deleteMany({});

  // Give each user at least one post
  const postsWithUsers = users.map((user, i) => ({
    ...postContents[i % postContents.length],
    author: user._id,
  }));

  // Fill the rest of the posts cycling through users
  for (let i = users.length; i < postContents.length; i++) {
    postsWithUsers.push({
      ...postContents[i],
      author: users[i % users.length]._id,
    });
  }

  const posts = await Post.insertMany(postsWithUsers);
  return posts;
}

module.exports = seedPosts;