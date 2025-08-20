const mongoose = require("mongoose");
const User = require("./models/user");
require("dotenv").config();

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

async function seedUsers() {
  await User.deleteMany({});
  const users = await User.insertMany(superVillains);
  return users;
}

module.exports = seedUsers;
