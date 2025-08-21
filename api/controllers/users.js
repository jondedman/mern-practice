const User = require("../models/user");

function create(req, res) {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const profilePicture = req.body.profilePicture;

  const user = new User({ fullname, email, password, profilePicture });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
}

const UsersController = {
  create: create,
};

module.exports = UsersController;
