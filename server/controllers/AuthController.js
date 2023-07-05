const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ where: { username: username } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the hashed password
      bcrypt.compare(password, user.passwordHash, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, 'your_secret_key');

        res.status(200).json({ token: token });
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};
