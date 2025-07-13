import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { middleware } from "./middleware";
const app = express();

app.post("/signup", (req, res) => {
  // db call
  res.json({
    userId: 3,
  });
});

app.post("/signin", (req, res) => {
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({ token });
});

app.post("/room", middleware, (req, res) => {
  //   db call
  res.json({
    roomId: 12,
  });
});
app.listen(3001);
