/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const router = require('express').Router();
const Application = require('../models/Applications.model');

router.get('/', (req, res, next) => {
  Application.find()
    .then((applications) => res.status(200).json(applications))
    .catch((err) =>
      next({
        log: `Error encountered in application get "/" route, when finding all apps in database. ${err}`,
        status: 503,
        message: {
          err: 'An error occurred when finding all apps in database.',
        },
      }),
    );
});

router.post('/add', (req, res, next) => {
  const { company, position, location } = req.body;

  const newApp = new Application({ company, position, location });
  newApp
    .save()
    .then(() => res.status(200).send('Application added!'))
    .catch((err) =>
      next({
        log: `Error encountered in application post "/add" route, when adding an app to database. ${err}`,
        status: 500,
        message: {
          err: 'An error occurred when adding the application to database.',
        },
      }),
    );
});

module.exports = router;
