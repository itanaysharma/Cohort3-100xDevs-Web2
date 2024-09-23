const express = require("express");
const Router = express.Router;
const adminRouter = Router();
const { adminModel, CourseModel } = require("../db.js");
const bcrypt = require("bcrypt");
const JWT_ADMIN_PASSWORD = "adminsecret";
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");
const mongoose = require("mongoose");
// bcrypt, zod, jsonwebtoken

adminRouter.post("/signup", async function (req, res) {
  const { firstName, lastName, email, password } = req.body;
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;
  // const email = req.body.email;
  // const password = req.body.password;
  await adminModel.create({
    email,
    password,
    firstName,
    lastName,
  });
  res.json({
    message: "signup endpoint",
  });
});

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({
    email,
    password,
  });
  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );
    //Do cookie logic
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});
adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;
  console.log(adminId);
  const { title, description, price, image } = req.body;
  const course = await CourseModel.create({
    title,
    description,
    price,
    image,
    creatorId: adminId,
  });
  res.json({
    message: "Course Created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;
  const { title, description, price, image, courseId } = req.body;
  console.log({
    creatorId: adminId,
    _id: courseId,
  });
  const course = await CourseModel.updateOne(
    {
      creatorId: adminId,
      _id: courseId,
    },
    { title, description, price, image }
  );
  if (course) {
    res.json({
      message: "course updated successfully",
      course,
    });
  } else {
    res.status(404).json({
      message: "not found",
    });
  }
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.adminId;
  const courses = await CourseModel.find({
    creatorId: adminId,
  });
  if (courses) {
    res.json({
      message: "Courses",
      courses,
    });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
