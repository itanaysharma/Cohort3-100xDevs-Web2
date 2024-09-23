// Initialise a new Node.js project
// npm install express mongoose
const express = require("express");
const app = express();

app.use(express.json());
app.post("/signup", function (req, res) {});

app.post("/siginin", (req, res) => {});

app.post("/todo", (req, res) => {});

app.get("/get", (req, res) => {});

app.listen(3000);
