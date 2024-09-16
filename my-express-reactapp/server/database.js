// import sequelize and datatypes from the sequelize package
const { Sequelize, DataTypes } = require('sequelize');

// set up sequelize to use sqlite with .
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db'
});

// define the user model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING, // 'name' is a string
      },
      index: { 
        type: DataTypes.INTEGER,
        unique: true,
      }
  },
);

const JournalEntry = sequelize.define('JournalEntry', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: { // Foreign key referencing the User model
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id', // 'id' is the assumed primary key for User
    },
  },
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
        { name: 'a' },
        { name: 'k' }
      ]);
      console.log('Users created:', await User.findAll());
    } else {
      console.log('users already exist, skipping insertion');
    }
  } catch (error) {
    console.error('error setting up database:', error);
  }
};


//association between journal and user
User.hasMany(JournalEntry, { foreignKey: 'userId' });


// call the setup function
setupDatabase();

module.exports = { User, JournalEntry}; // export the user model for use in other parts of the application
