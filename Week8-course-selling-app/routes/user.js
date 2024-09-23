const { Router } = require("express");
const { UserModel } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "usersecret";

userRouter.post("/signup", async function (req, res) {
  const { firstName, lastName, email, password } = req.body;
  // Todo: adding zod validation, hashing the password, try catch block
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
    req.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
