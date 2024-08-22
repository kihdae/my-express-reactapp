// server.js
const express = require('express');
const cors = require('cors');
const { User } = require('./database'); // user model

const app = express();
const port = 3000;

app.use(cors());

// API route to get list of users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll(); // fetches users from the database
    res.json(users); // send JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
