const { Router } = require("express");
const { UserModel, CourseModel, PurchaseModel } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");

userRouter.post("/signup", async function (req, res) {
  const { firstName, lastName, email, password } = req.body;
  // Todo: adding zod validation, hashing the password, try catch block
  await UserModel.create({
    email,
    password,
    firstName,
    lastName,
  });

  res.json({
    message: "Signup done successfully ",
  });
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
    password,
  });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
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

userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;
  const coursesIds = await PurchaseModel.find({ userId });
  console.log(coursesIds);

  const courses = [];
  for (let courseId of coursesIds) {
    console.log({ _id: courseId.courseId });
    courses.push(await CourseModel.findOne({ _id: courseId.courseId }));
  }

  res.json({
    message: "Shows all the purchases of the user",
    courses,
  });
});

module.exports = {
  userRouter: userRouter,
};
