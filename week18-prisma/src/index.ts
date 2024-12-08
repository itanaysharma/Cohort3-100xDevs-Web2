import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
const app = express();
const client = new PrismaClient();
app.use(express.json());

app.post("/user", async (req: Request, res: Response) => {
  const { username, password, age, city } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 16);

    const user = await client.user.create({
      data: {
        username,
        password: hashedPassword,
        age,
        city,
      },
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", async (req, res) => {
  const users = await client.user.findMany();
  res.json({
    users,
  });
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const user = await client.user.findFirst({
    where: {
      id: parseInt(id),
    },
    select: {
      todos: true,
      username: true,
    },
  });
  res.json({ user });
});
app.listen(3000);
