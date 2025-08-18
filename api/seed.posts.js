const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
require("dotenv").config();

async function connectToDatabase() {
    const mongoDbUrl = process.env.MONGODB_URL;

    if (!mongoDbUrl) {
        console.error(
            "No MongoDB url provided. Make sure there is a MONGODB_URL environment variable set. See the README for more details."
        );
        throw new Error("No connection string provided");
    }

    await mongoose.connect(mongoDbUrl);

    if (process.env.NODE_ENV !== "test") {
        console.log(process.env.NODE_ENV)
        console.log("Successfully connected to MongoDB")
    }
}

const postContents = [
    {"post": "Just because you’re plotting world domination doesn’t mean you can’t stop to smell the roses… then genetically enhance them to spit acid."},
    {"post": "Feeling cute, might vaporize the moon later, idk."},
    {"post": "Sometimes the greatest battles are fought in silence… and sometimes with a death ray. :sparkles:"},
    {"post": "Anyone know a good dry cleaner for cape soot? Asking for a friend."},
    {"post": "Spent the day at the beach with my henchmen. Sand got everywhere… especially in the giant robot joints."},
    {"post": "Your worth isn’t defined by your failures… unless you fail to annihilate your nemesis. Then, yes, that’s on you."},
    {"post": "Date night with my beloved sidekick :heart: We poisoned the wine together. #CoupleGoals"},
    {"post": "Nothing like a quiet evening reading by candlelight… in the ruins of my enemies’ lair."},
    {"post": "Power is taken, not given. Unless it’s gift-wrapped with a lovely bow, in which case thank you Karen for the blender!"},
    {"post": "Ran into my old arch-nemesis at the grocery store. Awkward."},
    {"post": "Be the change you wish to see in the world. Or just change the world to your liking. Both work."},
    {"post": "Is it weird to feel nostalgic about your first volcano lair?"},
    {"post": "Don’t let small minds convince you your plans are too big."},
    {"post": "Sunday fun day! We robbed a train AND had brunch."},
    {"post": "Sometimes I think my doomsday device is the only one who understands me."},
    {"post": "You’re never too old to start a new hobby… like summoning eldritch horrors."},
    {"post": "Anyone else’s minions keep eating their lunch from the lair fridge??"},
    {"post": "It’s okay to outgrow people. Especially when you grow into a 30-foot mech suit."}
];

const seedPosts = async () => {
    await connectToDatabase();

    try {
        await Post.deleteMany({});
        const users = await User.find({});

        if (!users.length) {
            console.log("No users found. Seed users first.");
            process.exit(1)
        }

        for (let i = 0; i < users.length; i++) {
            const post = new Post ({
                message: postContents[i].post,
                author: users[i % users.length]._id,
                createdAt: new Date()
            });

            await post.save();
        }
        console.log("Posts created successfully.")
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error("Error seeding posts:", err);
        await mongoose.disconnect();
        process.exit(1);
    }
};

seedPosts();