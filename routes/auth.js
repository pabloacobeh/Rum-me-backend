const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { generateJwt } = require("../helpers/generateJwt");

router.get("/", async (req, res) => {
  const users = await User.find().populate("favorites");
  try {
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't retrive the users" });
  }
});

router.post("/signup", async (req, res) => {
  const { email } = req.body;
  const testEmail = await User.findOne({ email });
  if (testEmail) {
    return res
      .status(500)
      .json({ message: "User not created. Check required information" });
  }
  const user = new User(req.body);
  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "User not created. Check required information" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("favorites");
  if (!user) {
    return res.status(500).json({ message: "Check email and/or password" });
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(500).json({ message: "Check email and/or password" });
  }
  const token = await generateJwt(user._id);
  return res.status(200).json({ user, token });
});

router.get("/favorites/:id", async (req, res) => {
  const { id } = req.params;
  const user = User.findById(id).populate("favorites");
  try {
    return res.status(200).json(user.favorites);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't get Rums" });
  }
});

router.put("/addFavorites:id", async (req, res) => {
  const { id } = req.params;
  const { rum } = req.body;
  const userToUpdate = await User.findById(id);
  const { favorites } = userToUpdate;
  const exists = favorites.find((id) => id === rum);
  if (exists) return;
  favorites.push(rum);
  userToUpdate.favorites = favorites;
  userToUpdate.save();
  try {
    return res.status(203).json(userToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't add favorites" });
  }
});

module.exports = router;
