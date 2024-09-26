// Retrieving environment variables for JWT secrets from the .env file
// These environment variables are used to sign and verify JWT tokens for both admins and users
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD; // Secret key for signing/verifying admin JWTs
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD; // Secret key for signing/verifying user JWTs

// Exporting the JWT secrets so they can be used in other parts of the application
module.exports = {
  JWT_ADMIN_PASSWORD, // Exporting admin JWT secret
  JWT_USER_PASSWORD, // Exporting user JWT secret
};
