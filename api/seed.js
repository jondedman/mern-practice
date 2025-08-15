// 1. import reauired files
    // models
    // database helpers?
    // environment variable for database uri??

// 2. create a connection to the database
// 3. add a user
// 4. once working, create users in a loop
// 5. for each user create a post

// const { MongoClient } = require('mongodb');


const mongoose = require("mongoose");
const User = require("./models/user");
// require("../tests/mongodb_helper");
require("dotenv").config();

async function connectToDatabase() {
    const mongoDbUrl = process.env.MONGODB_URL;
    // const mongoDbUrl = "mongodb://0.0.0.0/acebook";

    if (!mongoDbUrl) {
    console.error(
    "No MongoDB url provided. Make sure there is a MONGODB_URL environment variable set. See the README for more details."
    );
    throw new Error("No connection string provided");
    }

    await mongoose.connect(mongoDbUrl);

    if (process.env.NODE_ENV !== "test") {
    console.log(process.env.NODE_ENV)
    console.log("Successfully connected to MongoDB");
    }
}
const superVillains = [
    {
    fullname: "Darth Vader",
    email: "darth@deathstar.com",
    password: "password123"
    },
    {
    fullname: "Thanos Titan",
    email: "thanos@infinitygauntlet.org",
    password: "password123"
    },
    {
    fullname: "Lex Luthor",
    email: "lex@luthorcorp.com",
    password: "password123"
    },
    {
    fullname: "Harley Quinn",
    email: "harley@arkham.org",
    password: "password123"
    },
    {
    fullname: "Green Goblin",
    email: "norman@oscorp.com",
    password: "password123"
    },
    {
    fullname: "Magneto Erik",
    email: "magneto@genosha.mutants",
    password: "password123"
    },
    {
    fullname: "Doctor Doom",
    email: "doom@latveria.gov",
    password: "password123"
    },
    {
    fullname: "Joker Unknown",
    email: "joker@arkhamasylum.net",
    password: "password123"
    },
    {
    fullname: "Hela Odinsdottir",
    email: "hela@helheim.asgard",
    password: "password123"
    },
    {
    fullname: "Voldemort Riddle",
    email: "tom@darkarts.uk",
    password: "password123"
    }
];

const dbSeed = async () => {
    await connectToDatabase();
    try {
        await User.deleteMany({});  
        for (const villain of superVillains) {
    const user = new User({
    fullname: villain.fullname,
    email: villain.email,
    password: villain.password
    });
    await user.save();
}
    await mongoose.disconnect();
    process.exit(0);
    } catch (error) {
        console.log("Error:", error)
    }
    console.log("Users created")
    process.exit(1);
}

dbSeed();





// const mongoose = require("mongoose");
// const { connectToDatabase } = require("../db/db");

// (() => {
//     console.log("In function")
//     connectToDatabase();
 
// });





// beforeAll(async () => {
//     await connectToDatabase();
// });

// afterAll(async () => {
//     await mongoose.connection.close(true);
// });


