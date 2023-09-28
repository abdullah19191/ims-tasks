const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  name: String,
  supplier: String,
  quantity: Number,
  lowInStock: Boolean,
});

const Product = mongoose.model("Product", product);
module.exports = Product;
