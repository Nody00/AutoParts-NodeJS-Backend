const productModel = require("../models/products");

exports.getProducts = (req, res, next) => {
  const params = req.params.category;
  console.log("params");

  //   GET PRODUCTS BASED ON CATEGORY

  res.status(200).json({
    params: params,
    message: "SUCCESSFULL",
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
