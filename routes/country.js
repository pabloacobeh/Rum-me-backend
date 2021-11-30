const express = require("express");
const router = express.Router();

const Country = require("../models/Country");

router.get("/", async (req, res) => {
  const countries = await Country.find();
  try {
    if (countries.length === 0) {
      return res.status(400).json({ message: "Didn't find any Country" });
    }
    return res.status(200).json(countries);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong with the server" });
  }
});

router.post("/country", async (req, res) => {
  const countryToCreate = await Country.create(req.body);
  try {
    return res.status(201).json(countryToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't create Country" });
  }
});

router.delete("/country/:id", async (req, res) => {
  const { id } = req.params;
  const countryToDelete = await Country.findByIdAndDelete(id);
  try {
    return res.status(203).json({ message: "Country deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Couldn'y delete country" });
  }
});

module.exports = router;
