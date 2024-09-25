const express = require("express");
const Router = express.Router;
const courseRouter = Router();
const { userMiddleware } = require("../middleware/user");
const { PurchaseModel, CourseModel } = require("../db");

courseRouter.post("/purchase", userMiddleware, async function (req, res) {
  // you would expect the user to pay you money
  const userId = req.userId;
  const courseId = req.body.courseId;
  await PurchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "You have successfully bought the course",
  });
});

courseRouter.get("/preview", async function (req, res) {
  const courses = await CourseModel.find({});
  res.json({
    message: "Previews all the courses",
    courses,
  });
});

module.exports = {
  courseRouter,
};
