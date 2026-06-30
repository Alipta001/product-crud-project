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
    type: String,
    default:"Rupakar"
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
  public_id: { type: String, default: "" },
  description: { type: String, required: true },
  isDeleted: {
    type: Boolean,
    default: false
  },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
