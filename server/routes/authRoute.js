const router = require('express').Router();
const authController = require('../controllers/authController');

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

// User sign up
router.post('/signup', authController.createUser, (req, res, next) =>
  res.status(200).json('Account created successfully')
);

module.exports = router;
