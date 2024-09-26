const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Define the schema for the User collection in MongoDB
const User = new Schema({
  firstName: String, // User's first name
  lastName: String, // User's last name
  email: { type: String, unique: true }, // User's email (must be unique)
  password: String, // User's password (should be hashed in production)
});

// Define the schema for the Admin collection in MongoDB
const Admin = new Schema({
  firstName: String, // Admin's first name
  lastName: String, // Admin's last name
  email: { type: String, unique: true }, // Admin's email (must be unique)
  password: String, // Admin's password (should be hashed in production)
});

// Define the schema for the Course collection in MongoDB
const Course = new Schema({
  title: String, // Course title
  description: String, // Course description
  price: Number, // Course price
  imageUrl: String, // URL for the course image
  creatorId: ObjectId, // Reference to the admin who created the course (admin's ObjectId)
});

// Define the schema for the Purchase collection in MongoDB
const Purchase = new Schema({
  courseId: ObjectId, // Reference to the purchased course (course's ObjectId)
  userId: ObjectId, // Reference to the user who purchased the course (user's ObjectId)
});

// Creating models for each schema, which will allow us to interact with the corresponding MongoDB collections
const UserModel = mongoose.model("user", User); // Model for the 'user' collection
const adminModel = mongoose.model("admin", Admin); // Model for the 'admin' collection
const CourseModel = mongoose.model("course", Course); // Model for the 'course' collection
const PurchaseModel = mongoose.model("purchase", Purchase); // Model for the 'purchase' collection

// Exporting the models so they can be used in other parts of the application
module.exports = {
  UserModel,
  adminModel,
  CourseModel,
  PurchaseModel,
};
