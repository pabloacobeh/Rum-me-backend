const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Couldn't connect to db"));

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

app.get("/", async (req, res) => {
  res.json({ message: "Route works" });
});

app.use("/api/v1/countries", require("./routes/country"));
app.use("/api/v1/rums", require("./routes/rum"));
app.use("/api/v1/auth", require("./routes/auth"));

const port = process.env.PORT;
app.listen(port, () => console.log("Server running..."));
