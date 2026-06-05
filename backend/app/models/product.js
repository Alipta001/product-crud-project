const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
},
  price: { type: Number, required: true },
  brand:{
    type: String
  },
  stock:{
    type: Number
  },
  category:{
    type: String
  },
  image:{
    type: String,
    default: "image"
  },
  description: { type: String, required: true },
  isDeleted: {
    type: Boolean,
    default: false
  },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
