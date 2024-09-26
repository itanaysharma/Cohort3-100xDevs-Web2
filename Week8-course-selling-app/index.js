// This line imports the 'dotenv' package so that environment variables from the .env file can be loaded into process.env
// The .env file is also added to .gitignore to avoid pushing sensitive information to version control
require("dotenv").config();
const express = require("express");

// Importing the routers we created for handling user, course, and admin-related routes
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

// Importing mongoose to handle MongoDB connections (credentials are stored in the .env file)
const mongoose = require("mongoose");
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// This mounts the userRouter to handle requests made to '/api/v1/user/*'
// For example, if a user searches for "/api/v1/user/someEndpoint", userRouter will handle it
app.use("/api/v1/user", userRouter);

// This mounts the courseRouter to handle requests made to '/api/v1/course/*'
app.use("/api/v1/course", courseRouter);

// This mounts the adminRouter to handle requests made to '/api/v1/admin/*'
app.use("/api/v1/admin", adminRouter);

async function main() {
  // Connecting to the MongoDB database, using credentials provided in the .env file
  await mongoose.connect(process.env.MONGO_URL);

  // The application will listen on port 3000 for incoming HTTP requests
  app.listen(3000);
  console.log("Server is listening on port 3000");
}

main();
