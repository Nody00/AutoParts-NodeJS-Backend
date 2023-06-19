const productModel = require("../models/products");
const mongoose = require("mongoose");

exports.getProducts = (req, res, next) => {
  const paramsCategory = req.params.category;
  const filter = req.query.filter;

  let filterSetting = null;

  if (filter === "lowest") {
    filterSetting = "asc";
  }

  if (filter === "highest") {
    filterSetting = "desc";
  }

  const currentPage = req.query.page || 1;
  let limit = 3;
  if (paramsCategory === "all") {
    limit = 20;
  }
  let searchQuery = { category: paramsCategory };

  //   GET PRODUCTS BASED ON CATEGORY
  if (paramsCategory === "all") {
    searchQuery = null;
  }
  productModel
    .find(searchQuery)
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return productModel
        .find(searchQuery)
        .sort({ price: filterSetting })
        .skip((currentPage - 1) * limit)
        .limit(limit);
    })
    .then((products) => {
      if (!products) {
        const error = new Error("No products found!");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ products: products, totalItems: totalItems });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  productModel
    .findById(productId)
    .then((product) => {
      if (!product) {
        const error = new Error("No such product");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ product: product });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addProduct = (req, res, next) => {
  const { product } = req.body;

  const newProduct = new productModel({
    ...product,
  });

  newProduct
    .save()
    .then((result) => {
      res.status(200).json({ result: result, message: "Product added" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUserProducts = (req, res, next) => {
  const userId = req.params.userId;

  if (!userId) {
    const error = new Error("Could not authenticate!");
    error.statusCode = 401;
    throw error;
  }

  productModel
    .find({ userId: userId })
    .then((products) => {
      if (!products) {
        const error = new Error("No products found!");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ products: products });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  if (!productId) {
    const error = new Error("No product ID found!");
    error.statusCode = 404;
    throw error;
  }

  productModel
    .findOneAndDelete()
    .then((result) => {
      res.status(200).json({ result: result, message: "Product Deleted." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const { product } = req.body;

  productModel
    .findByIdAndUpdate(product._id, product)
    .then((result) => {
      res.status(200).json({ result: result, message: "Product Updated!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.searchProducts = (req, res, next) => {
  const searchQuery = req.params.productTitle;

  productModel
    .find({ title: { $regex: searchQuery } })
    .then((result) => {
      res.status(200).json({ products: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
