const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;
const { toast } = require('react-toastify');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(409).send({ message: 'Username already exists' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      password: password,
      passwordHash: passwordHash // Store the hashed password
    });

    res.send({ user: user });
  } catch (err) {
    toast.error('An error occurred while registering. Please try again.'); // Display error message as a popup
    res.status(500).send({ message: err.message });
  }
};
