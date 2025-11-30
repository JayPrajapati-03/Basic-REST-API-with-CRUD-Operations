const express = require("express");
const { v4: uuidv4 } = require("uuid");
const users = require("./users-db");

const app = express();
app.use(express.json());

// Email Validation Function
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ---------------------------
// CREATE USER (POST)
// ---------------------------
app.post("/users", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }

  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: "Name, email and age are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const id = uuidv4();

  users[id] = { id, name, email, age };
  res.status(201).json(users[id]);
});

// ---------------------------
// READ ALL USERS (GET)
// ---------------------------
app.get("/users", (req, res) => {
  res.json(Object.values(users));
});

// ---------------------------
// READ SINGLE USER (GET)
// ---------------------------
app.get("/users/:id", (req, res) => {
  const user = users[req.params.id];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// ---------------------------
// UPDATE USER (PUT)
// ---------------------------
app.put("/users/:id", (req, res) => {
  const user = users[req.params.id];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }

  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: "Name, email and age are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  users[req.params.id] = { id: req.params.id, name, email, age };

  res.json(users[req.params.id]);
});

// ---------------------------
// DELETE USER (DELETE)
// ---------------------------
app.delete("/users/:id", (req, res) => {
  const user = users[req.params.id];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  delete users[req.params.id];

  res.json({ message: "User deleted successfully" });
});

// ---------------------------
// START SERVER
// ---------------------------
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
