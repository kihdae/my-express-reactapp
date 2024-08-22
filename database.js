// import sequelize and datatypes from the sequelize package
const { Sequelize, DataTypes } = require('sequelize');

// set up sequelize to use sqlite with a file named 'database.sqlite'
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // path to our sqlite database file
});

// define the user model with a single 'name' field
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING, // 'name' is a string
      }
});

// function to sync the database and add initial users
const setupDatabase = async () => {
  try {
    // create the table if it doesn't exist
    await sequelize.sync();

    // check if there are any users already in the database
    const usersCount = await User.count();
    if (usersCount === 0) {
      // if no users exist, add the initial users
      await User.bulkCreate([
        { name: 'wa-jiw' },
        { name: 'aria' },
        { name: 'kadin' }
      ]);
      console.log('database is ready with initial users');
    } else {
      console.log('users already exist, skipping insertion');
    }
  } catch (error) {
    console.error('error setting up database:', error);
  }
};


// call the setup function
setupDatabase();

module.exports = { User }; // export the user model for use in other parts of the application
