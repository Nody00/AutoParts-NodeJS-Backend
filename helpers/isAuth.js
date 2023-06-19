const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("No authorization header found!");
    error.statusCode = 401;
    throw error;
  }

  const token = req.get("Authorization").split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(
      token,
      "my-32-character-ultra-secure-and-ultra-long-secret"
    );
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated!");
    error.statusCode = 401;
    throw error;
  }
  next();
};
