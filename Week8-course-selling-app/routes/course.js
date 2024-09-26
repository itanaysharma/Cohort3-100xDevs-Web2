const express = require("express");
const Router = express.Router;
const courseRouter = Router();

// Importing the user middleware to ensure only authenticated users can purchase courses
const { userMiddleware } = require("../middleware/user");

// Importing the PurchaseModel and CourseModel to handle course-related database operations
const { PurchaseModel, CourseModel } = require("../db");

// Route for purchasing a course, protected by user authentication (userMiddleware)
courseRouter.post("/purchase", userMiddleware, async function (req, res) {
  // Expect the user to make a purchase (payment process would typically be integrated here)

  // Extracting the user ID from the request object (set by the userMiddleware)
  const userId = req.userId;

  // Extracting the course ID from the request body, which is sent when a course is purchased
  const courseId = req.body.courseId;

  // Recording the course purchase in the Purchase collection
  await PurchaseModel.create({
    userId,
    courseId,
  });

  // Sending a success message once the purchase is recorded
  res.json({
    message: "You have successfully bought the course",
  });
});

// Route to preview all available courses, no authentication required
courseRouter.get("/preview", async function (req, res) {
  // Fetching all courses from the Course collection
  const courses = await CourseModel.find({});

  // Sending a response with all the course previews
  res.json({
    message: "Previews all the courses",
    courses,
  });
});

// Exporting the courseRouter to be used in other parts of the application
module.exports = {
  courseRouter,
};
