const express = require("express");

// Defining the Router function from Express
const Router = express.Router;
const adminRouter = Router();

// Importing the necessary models for admin and course
const { adminModel, CourseModel } = require("../db.js");

// Importing packages for encryption and token management
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware to check if the admin is authenticated via JWT and to set the admin ID in the request object
const { adminMiddleware } = require("../middleware/admin");
const mongoose = require("mongoose");
const { JWT_ADMIN_PASSWORD } = require("../config");

// We used to handle routes directly via app.post, but now we use the express Router to modularize the code

// Admin sign-up route - creates a new admin account
adminRouter.post("/signup", async function (req, res) {
  const { firstName, lastName, email, password } = req.body;

  // An alternative way of accessing request body data would be:
  // const firstName = req.body.firstName;

  //hassing up the password using bcrypt and salt
  const hashedPassword = await bcrypt.hash(password, 10);
  // Creating a new admin record in the MongoDB admin collection
  await adminModel.create({
    email,
    password: hashedPassword, //hashed password is saved in the db
    firstName,
    lastName,
  });

  res.json({
    message: "signup endpoint",
  });
});

// Admin sign-in route - authenticates admin and returns a JWT token
adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  // Finding admin by email and password
  const admin = await adminModel.findOne({
    email,
  });

  // If admin exists, sign and return a JWT token
  if (admin) {
    //compring the hashed password with the passed password using bcrypt
    const passwordMatch = bcrypt.compare(password, admin.password);
    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: admin._id,
        },
        JWT_ADMIN_PASSWORD
      );
      res.json({
        token: token,
      });
    } else {
      // Respond with a 403 error if credentials are incorrect
      res.status(403).json({
        message: "Incorrect credentials",
      });

      // Responding with the token
    }
  } else {
    // Respond with a 403 error if credentials are incorrect
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

// Route to create a new course - admin must be authenticated
adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId; // Extracted from the token via middleware
  const { title, description, price, image } = req.body;

  // Inserting a new course in the Course collection
  const course = await CourseModel.create({
    title,
    description,
    price,
    image,
    creatorId: adminId,
  });

  // Respond with success message and created course ID
  res.json({
    message: "Course Created",
    courseId: course._id,
  });
});

// Route to update course details - admin must be authenticated
adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId; // Extracted from the token via middleware
  const { title, description, price, image, courseId } = req.body;

  // Updating the course in the database
  const course = await CourseModel.updateOne(
    {
      creatorId: adminId,
      _id: courseId,
    },
    { title, description, price, image }
  );

  // Responding with success if the course was found and updated
  if (course) {
    res.json({
      message: "Course updated successfully",
      course,
    });
  } else {
    // Respond with a 404 error if the course is not found
    res.status(404).json({
      message: "Course not found",
    });
  }
});

// Route to get all courses created by the authenticated admin
adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.adminId; // Extracted from the token via middleware

  // Finding all courses created by the admin
  const courses = await CourseModel.find({
    creatorId: adminId,
  });

  // Responding with the list of courses
  if (courses) {
    res.json({
      message: "Courses",
      courses,
    });
  }
});

// Exporting the adminRouter to be used in other parts of the application
module.exports = {
  adminRouter: adminRouter,
};
