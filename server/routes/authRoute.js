const router = require('express').Router();
const async = require('async');

// User sign in
router.post('/login', (req, res, next) => {
  /*
   * TO-DO: implement query database to verify user, and assigning JWT for verifed user
   */
  res.json(req.body.username === 'yisun' ? req.body.username : null);
});

module.exports = router;
