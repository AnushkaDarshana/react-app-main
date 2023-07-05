const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    passwordHash: DataTypes.TEXT // Added column for storing hashed password
  }, {
    tableName: 'user',
    timestamps: false
  });

  // Authenticate user based on username and password
  User.authenticate = async function (username, password) {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    return user;
  };

  return User;
};
