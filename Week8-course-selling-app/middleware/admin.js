const jwt = require("jsonwebtoken");

// Importing the admin JWT secret from the config file, which is loaded from environment variables (.env file)
const { JWT_ADMIN_PASSWORD } = require("../config");

// Middleware to verify the JWT token and set the adminId in the request object for further use
function adminMiddleware(req, res, next) {
  // Retrieving the token from the request headers
  const token = req.headers.token;

  // Verifying the token using the secret key (JWT_ADMIN_PASSWORD)
  const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

  // If the token is valid, set the decoded admin ID in the request object and proceed to the next middleware or route
  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    // If the token is invalid, respond with a 403 error and an appropriate message
    res.status(403).json({
      message: "You are not signed in",
    });
  }
}

// Exporting the middleware to be used in other routes
module.exports = {
  adminMiddleware,
};
