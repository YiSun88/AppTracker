const router = require('express').Router();
const authController = require('../controllers/authController');

// User sign up
router.post('/signup', authController.createUser, (req, res, next) =>
  res.status(200).json('Account created successfully')
);

// User log in
router.post(
  '/login',
  authController.userAuthentication,
  authController.generateJWT,
  (req, res, next) => {
    res
      .cookie('access_token', res.locals.token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 10 ** 7,
      })
      .status(200)
      .json({ username: req.body.username });
  }
);

// User log out
router.delete('/logout', (req, res, next) =>
  res.clearCookie('access_token').status(200).json('Sign out successfully')
);

module.exports = router;
