// server.js
const { Sequelize, DataTypes} = require('sequelize');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json())// allows my data to be able to be mapped over 
app.use(express.json()); // JSON bodies

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Define the User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the JournalEntry model
const JournalEntry = sequelize.define('JournalEntry', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

// route to get list of users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll()
    // const users = ['user']; // fetches users from the database
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

//default route
app.get('*', (req, res) => {
  res.json({ message: "This request doesn't exist"});
});

// const sequelize = new Sequelize({
//   dialect: 'sqlite', 
//   storage: './database.db' 
// });
// //defining new model for junral entries
// const JournalEntry = sequelize.define('JournalEntry', {
//   content: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   }
// });

//route for said journal entry

app.post('/api/journal', async (req, res) => {
  try {
    const url = 'http://localhost:3000/api/journal';
    const { content, userId } = req.body;

    // Check if user exists
    const user = await User.findByPk(userId);
    console.log(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newJournalEntry = await JournalEntry.create({ content, userId });
    res.status(201).json(newJournalEntry);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add journal entry' });
  }
  
    console.log('Received POST request to /api/journal');
});
    
// User.prototype.createJournalEntry = async function (content) {
//   const newJournalEntry = await this.create({ content });
//   return newJournalEntry;
// };
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

//kadin is a ok helper