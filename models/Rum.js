const { model, Schema } = require("mongoose");

const RumSchema = Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["LIGHT", "GOLD", "DARK", "AGED", "BLACK", "SPICED"],
    require: true,
  },
  country: {
    type: String,
    require: true,
    trim: true,
    ref: "Country",
  },

  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
});

module.exports = model("Rum", RumSchema);
