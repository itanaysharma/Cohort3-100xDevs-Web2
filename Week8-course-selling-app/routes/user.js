const { Router } = require("express");
const { UserModel, CourseModel, PurchaseModel } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");

// Route for user sign-up (registering a new user)
userRouter.post("/signup", async function (req, res) {
  const { firstName, lastName, email, password } = req.body;

  // ToDo: Add validation using zod, hash the password for security, and wrap in try-catch for error handling
  await UserModel.create({
    email,
    password, // In production, the password should be hashed before saving
    firstName,
    lastName,
  });

  // Responding with a success message after the user is created
  res.json({
    message: "Signup done successfully",
  });
});

// Route for user sign-in (logging in a user and returning a JWT token)
userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  // Finding a user by email and password in the database
  const user = await UserModel.findOne({
    email,
    password, // In production, password comparison should involve comparing the hashed version
  });

  // If the user is found, generate a JWT token
  if (user) {
    const token = jwt.sign(
      {
        id: user._id, // The user ID is embedded in the token payload
      },
      JWT_USER_PASSWORD // Signing the token with the user secret key from the config
    );

    // Responding with the token, which will be used for future authentication
    res.json({
      token: token,
    });
  } else {
    // If credentials are incorrect, respond with a 403 status and error message
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

// Route to retrieve all the courses purchased by a user (protected by user authentication)
userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId; // Extracted from the JWT token by the middleware

  // Finding all the purchases associated with the user
  const coursesIds = await PurchaseModel.find({ userId });

  console.log(coursesIds); // Logging the course IDs for debugging

  // Array to hold the full course details
  const courses = [];

  // Looping through the purchased course IDs to fetch the corresponding course details
  for (let courseId of coursesIds) {
    console.log({ _id: courseId.courseId }); // Logging the course ID for debugging
    courses.push(await CourseModel.findOne({ _id: courseId.courseId })); // Fetching course details by ID and adding it to the courses array
  }

  // Responding with all the courses purchased by the user
  res.json({
    message: "Shows all the purchases of the user",
    courses,
  });
});

// Exporting the userRouter to be used in other parts of the application
module.exports = {
  userRouter: userRouter,
};
