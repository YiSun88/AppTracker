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
      })
    );
});

router.post('/add', (req, res, next) => {
  const { company, position, location, dateSubmitted } = req.body;

  const newApp = new Application({
    company,
    position,
    location,
    dateSubmitted,
  });

  /*
   * .catch() will only catch the rejected promise. Need to use try/catch if the error is not rejected properly or being thrown. (i.e. using an invalid method in the promise chain like .any())
   */
  try {
    newApp
      .save()
      .then((application) => res.status(200).json(application))
      .catch((err) =>
        next({
          log: `Error encountered in application post "/add" route, when adding an app to database. ${err}`,
          status: 500,
          message: {
            err: 'An error occurred when adding the application.\n Please fill all required fields.',
          },
        })
      );
  } catch (err) {
    next({
      log: `Error encountered in application post "/add" route, maybe wrong promise chain. ${err}`,
      status: 500,
      message: {
        err: 'An error occurred when adding the application.',
      },
    });
  }
});

router.put('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  const { company, position, location, dateSubmitted } = req.body;

  try {
    const updatedApp = await Application.findByIdAndUpdate(
      id,
      {
        company,
        position,
        location,
        dateSubmitted,
      },
      { returnDocument: 'after' }
    );
    res.status(200).json(updatedApp);
  } catch (err) {
    next({
      log: `Error encountered in application put "/edit" route, ${err}`,
      status: 500,
      message: {
        err: 'An error occurred when editing the application.',
      },
    });
  }
});

module.exports = router;
