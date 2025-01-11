import express from "express"
import { Client } from "pg";
const app = express()
app.use(express.json())
const pgClient = new Client({
  user: "postgres",
  password: "admin",
  port: 5432,
  host: "localhost",
  database: "testingnew",
});
  pgClient.connect();

  app.post("/signup", async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password
    const email = req.body.email
    const city = req.body.city
  })
  
