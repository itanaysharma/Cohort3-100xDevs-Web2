const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

// Middleware to verify the user's JWT token and set userId in the request object
function userMiddleware(req, res, next) {
  // Retrieve the JWT token from the request headers
  const token = req.headers.token;

  // Verify the token using the secret key (JWT_USER_PASSWORD)
  const decode = jwt.verify(token, JWT_USER_PASSWORD);

  // If the token is valid, extract the user ID from the decoded token and store it in the request object
  if (decode) {
    req.userId = decode.id; // Setting the userId for later use in the request lifecycle
    next(); // Continue to the next middleware or route handler
  } else {
    // If the token is invalid or expired, respond with a 403 error and an appropriate message
    res.status(403).json({
      message: "Signin failed", // Sending a failure message if the token is not valid
    });
  }
}

// Exporting the middleware to be used for protecting routes where user authentication is required
module.exports = {
  userMiddleware,
};
