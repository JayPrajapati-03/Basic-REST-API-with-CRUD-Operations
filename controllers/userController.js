const User = require("../models/User");

// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const user = await User.create({ name, email, age });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Get User by ID
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ error: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({ message: "User deleted successfully" });
};
