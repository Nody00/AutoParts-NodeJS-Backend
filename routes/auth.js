const express = require("express");
const authControllers = require("../controllers/auth");
const { body } = require("express-validator");
const router = express.Router();

router.post(
  "/signup",
  [
    body("firstName").notEmpty().escape().trim().isLength({ min: 3 }),
    body("lastName").notEmpty().escape().trim().isLength({ min: 3 }),
    body("email").notEmpty().escape().trim().isEmail(),
    body("password").notEmpty().escape().trim().isLength({ min: 8 }),
  ],
  authControllers.signUp
);

router.post(
  "/login",
  [
    body("email").notEmpty().escape().trim().isEmail(),
    body("password").notEmpty().escape().trim().isLength({ min: 8 }),
  ],
  authControllers.login
);

module.exports = router;
