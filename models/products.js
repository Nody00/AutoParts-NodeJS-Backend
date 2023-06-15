const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    numCilinders: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    power: {
      type: String,
      required: true,
    },
    oil: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    miles: {
      type: String,
      required: true,
    },
    discount: {
      type: Boolean,
      required: true,
    },
    discountAmount: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
