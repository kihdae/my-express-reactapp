// server.js
const express = require('express');
const cors = require('cors');
const { User } = require('./database'); 
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json())// allows my data to be able to be mapped over 
app.use(express.json()); // JSON bodies

// route to get list of users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll(); // fetches users from the database
    res.json(users); // send JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.delete('/api/users', (req, res) => {
  User.destroy({
    where: {}, // delete all
  })
    .then(() => {
      res.status(200).send({ message: 'All users have been deleted.' });
    })
    .catch(err => {
      res.status(500).send({ message: 'Error deleting users', error: err });
    });
});

app.get('*', (req, res) => {
  res.json({ message: "This request doesn't exist"});
});

// rouute to add a new user
app.post('/api/users', async (req, res) => {
  try {
    const { name } = req.body; 
    const newUser = await User.create({ name }); // create a new user in db
    res.status(201).json(newUser); // send the created user as the response
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//kadin is dumb
