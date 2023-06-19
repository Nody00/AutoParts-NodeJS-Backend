const express = require("express");
const productControllers = require("../controllers/products");
const router = express.Router();
const isAuth = require("../helpers/isAuth");

router.get("/allProducts/:category", productControllers.getProducts);

router.get("/search/:productTitle", productControllers.searchProducts);

router.get("/user/:userId", productControllers.getUserProducts);

router.get("/product/:productId", productControllers.getProduct);

router.post("/add", isAuth, productControllers.addProduct);

router.patch("/update", isAuth, productControllers.updateProduct);

router.delete("/delete/:productId", isAuth, productControllers.deleteProduct);

module.exports = router;
