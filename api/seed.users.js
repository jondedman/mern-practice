const mongoose = require("mongoose");
const User = require("./models/user");
require("dotenv").config();

const superVillains = [
    {
    fullname: "Darth Vader",
    email: "darth@deathstar.com",
    password: "password123",
    avatar: "/DarthVader.jpeg"
    },
    {
    fullname: "Thanos Titan",
    email: "thanos@infinitygauntlet.org",
    password: "password123",
    avatar: "/ThanosAvatar.jpeg"
    },
    {
    fullname: "Lex Luthor",
    email: "lex@luthorcorp.com",
    password: "password123",
    avatar: "/LexLuthor.jpeg"
    },
    {
    fullname: "Harley Quinn",
    email: "harley@arkham.org",
    password: "password123",
    avatar: "/harley-quinn.jpeg"
    },
    {
    fullname: "Green Goblin",
    email: "norman@oscorp.com",
    password: "password123",
    avatar: "/GreenGoblin.jpeg"
    },
    {
    fullname: "Magneto Erik",
    email: "magneto@genosha.mutants",
    password: "password123",
    avatar: "/MagnetoErik.jpeg"
    },
    {
    fullname: "Doctor Doom",
    email: "doom@latveria.gov",
    password: "password123",
    avatar: "/DrDoom.jpeg"
    },
    {
    fullname: "The Joker",
    email: "joker@arkhamasylum.net",
    password: "password123",
    avatar: "/joker.jpeg"
    },
    {
    fullname: "Hela Odinsdottir",
    email: "hela@helheim.asgard",
    password: "password123",
    avatar: "/HelaOdinsdottir.jpeg"
    },
    {
    fullname: "Voldemort Riddle",
    email: "tom@darkarts.uk",
    password: "password123",
    avatar: "/Voldemort.jpeg"
    }
];

async function seedUsers() {
  await User.deleteMany({});
  const users = await User.insertMany(superVillains);
  return users;
}

module.exports = seedUsers;
