const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Couldn't connect to db"));

app.get("/", async (req, res) => {
  res.json({ message: "Route works" });
});

const port = process.env.PORT;
app.listen(port, () => console.log("Server running..."));
