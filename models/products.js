const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    numCilinders: {
      type: String,
    },
    capacity: {
      type: String,
    },
    power: {
      type: String,
    },
    oil: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    miles: {
      type: String,
    },
    discount: {
      type: Boolean,
    },
    discountAmount: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
    brakeSize: {
      type: String,
    },
    brakeMaterial: {
      type: String,
    },
    coolingPower: {
      type: String,
    },
    suspensionTravel: {
      type: String,
    },
    suspensionMaterial: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
