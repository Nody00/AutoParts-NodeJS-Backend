const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const paymentsRoutes = require("./routes/payments");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/payments", paymentsRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, error: true });
});

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then((result) => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => console.log(err));
