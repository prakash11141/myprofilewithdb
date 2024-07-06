const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(
  "mongodb+srv://prakash11141:angryme@cluster0.fbsm3wg.mongodb.net/formdata?retryWrites=true&w=majority&appName=Cluster0"
);

// Define a schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const User = mongoose.model("User", userSchema);

// Route to handle form submission
app.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newUser = new User({ name, email, message });
    await newUser.save();
    res.json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
