const express = require("express");
const router = express.Router();
// const cloudinary = require("cloudinary").v2;
const Rum = require("../models/Rum");

router.get("/", async (req, res) => {
  const rums = await Rum.find().populate("country");
  try {
    if (rums.length == 0) {
      return res.status(400).json({ message: "Rums not found" });
    }
    return res.status(200).json(rums);
  } catch (error) {
    return res.status(500).json({ message: "Rums not found" });
  }
});

router.get("/rum/:id", async (req, res) => {
  const { id } = req.params;
  const rum = await Rum.findById(id).populate("country");
  try {
    return res.status(200).json(rum);
  } catch (error) {
    return res.status(500).json({ message: "Rum not found" });
  }
});

router.post("/rum/imageUpload/:id", async (req, res) => {
  const { id } = req.params;
  const rumToUpdate = await Rum.findById(id);
  if (rumToUpdate.image) {
    let array = rumToUpdate.image.split("/");
    let fileName = array[array.length - 1];
    const [public_id] = fileName.split(".");
    await cloudinary.uploader.destroy(public_id);
  }

  const { temFilePath } = req.files.image;
  const { secure_url } = await cloudinary.uploader.upload(temFilePath);
  rumToUpdate.image = secure_url;
  await rumToUpdate.save();
  try {
    return res.status(201).json(rumToUpdate);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an error with the image" });
  }
});

router.post("/rum", async (req, res) => {
  const rumToCreate = await Rum.create(req.body);
  try {
    return res.status(201).json(rumToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Rum not created" });
  }
});

router.put("/rum/:id", async (req, res) => {
  const { id } = req.params;
  const rumToUpdate = await Rum.findByIdAndUpdate(id, req.body, { new: true });
  try {
    return res.status(202).json(rumToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Rum not updated" });
  }
});

router.delete("/rum/:id", async (req, res) => {
  const { id } = req.params;
  await Rum.findByIdAndUpdate(id);
  try {
    return res.status(203).json({ message: "Rum deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Rum not deleted" });
  }
});

module.exports = router;
