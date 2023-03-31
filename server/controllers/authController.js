const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');
require('dotenv').config();

const authController = {};

// Create a user account
authController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username.length || !password.length) {
    return next({
      log: `Invalid username or password`,
      status: 400,
      message: {
        err: 'Invalid username or password',
      },
    });
  }
  try {
    await User.create({ username, password });
    return next();
  } catch (err) {
    return next({
      log: `Error encountered in user post "/signup" route. ${err}`,
      status: 400,
      message: {
        err: 'An error occured when signing up.',
      },
    });
  }
};

// Verify the username and password via database query, for first sign in
authController.userAuthentication = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return next({
        log: `Incorrect username or password.`,
        status: 401,
        message: {
          err: 'Incorrect username or password.',
        },
      });
    }
    return next();
  } catch (err) {
    return next({
      log: `Error encountered in user post "/login" route. ${err}`,
      status: 500,
      message: {
        err: 'An error occurred when logging in.',
      },
    });
  }
};

// Generate JWT after sign in
authController.generateJWT = (req, res, next) => {
  const token = jwt.sign({ username: req.username }, process.env.SECRET_KEY, {
    expiresIn: '3h',
  });
  res.locals.token = token;
  return next();
};

// Verify the JWT in the cookie
authController.verifyJWT = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    res.locals.username = payload.username;
    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

// Log out and clear the cookie

module.exports = authController;
