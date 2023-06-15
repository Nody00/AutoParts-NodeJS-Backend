const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation errors");
    error.statusCode = 400;
    error.errorArr = errors.array();
    res.status(400).json({ error: error });
  }
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  // check if user already exists
  userModel
    .find({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("User already exists!");
        error.statusCode = 400;
        throw error;
      }
      //   hash password
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      // create new user
      const user = new userModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "User created!", result: result, error: false });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation errors");
    error.statusCode = 400;
    error.errorArr = errors.array();
    res.status(400).json({ error: error });
  }

  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  // check if user exists in db
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("No such user found");
        error.statusCode = 400;
        throw error;
      }

      // user exists compare the passwords
      loadedUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 400;
        throw error;
      }

      // passwords match make token
      const token = jwt.sign(
        {
          email: email,
          userId: loadedUser._id.toString(),
        },
        "my-32-character-ultra-secure-and-ultra-long-secret",
        {
          expiresIn: "3h",
        }
      );

      // send token to client
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
