const express = require("express");
const productControllers = require("../controllers/products");
const router = express.Router();

router.get("/allProducts/:category", productControllers.getProducts);

router.get("/product/:productId", productControllers.getProduct);

module.exports = router;
