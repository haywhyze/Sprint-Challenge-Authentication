const axios = require('axios');
const bcrypt = require('bcryptjs');
const Users = require('../users/usersModel');

const { authenticate, generateToken } = require('../auth/authenticate');

function register(req, res) {
  const { username, password } = req.body;
  if (username && password) {
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = {
      username,
      password: hashedPassword,
    };
    console.log(user);
    Users.add(user)
      .then((saved) => {
        const token = generateToken(saved.id);
        res.status(201).json({
          id: saved.id,
          username: saved.username,
          token,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ message: 'Required field(s) missing' });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then((response) => {
      res.status(200).json(response.data.results);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

module.exports = (server) => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};
