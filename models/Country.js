const { model, Schema } = require("mongoose");

const CountrySchema = Schema({
  name: { type: String },
});

module.exports = model("Country", CountrySchema);
