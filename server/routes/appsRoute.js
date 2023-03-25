/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const router = require('express').Router();
const Application = require('../models/Applications.model');

// Get all applications for the Frontend table
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

// Add a new job application
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

// Edit an existing job application
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
      log: `Error encountered in application put "/edit/:id" route, ${err}`,
      status: 500,
      message: {
        err: 'An error occurred when editing the application.',
      },
    });
  }
});

// Get an existing application
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundApp = await Application.findById(id);
    res.status(200).json(foundApp);
  } catch (err) {
    next({
      log: `Error encountered in application get "/:id" route, ${err}`,
      status: 500,
      message: {
        err: 'An error occurred when finding the application.',
      },
    });
  }
});

// Delete an existing job application
router.delete('/delete/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedApp = await Application.findByIdAndDelete(id);
    if (!deletedApp) {
      return next({
        log: `Error encountered in application delete "/delete/:id" route, document with the specific id was not found in database`,
        status: 500,
        message: {
          err: 'An error occurred when deleting the application. Document with the specific id was not found in database',
        },
      });
    }
    return res.status(200).json(deletedApp._id);
  } catch (err) {
    return next({
      log: `Error encountered in application delete "/delete/:id" route, ${err}`,
      status: 500,
      message: {
        err: 'An error occurred when deleting the application.',
      },
    });
  }
});

module.exports = router;
