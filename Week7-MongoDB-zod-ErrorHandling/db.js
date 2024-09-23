// Schema for Mongoose db

const mongoose = require("mongoose");
const Schema = mongoose.schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const Todo = new Schema({
  userId: ObjectId,
  title: String,
  doen: Boolean,
});

// It will create a new collection with the name defined and add the schema.
const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

module.exports = (UserModel, TodoModel);
