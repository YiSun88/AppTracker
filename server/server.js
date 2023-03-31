const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

const app = express();
const port = 3000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const appsRouter = require('./routes/appsRoute');
const authRouter = require('./routes/authRoute');

app.use('/apps', appsRouter);
app.use('/auth', authRouter);

// statically serve everything in the dist folder on the route '/dist'
app.use('/dist', express.static(path.join(__dirname, '../dist/')));

// serve index.html on the route '/'.
// The '/*' is to make sure refresh in browser works with frontend routing (https://ui.dev/react-router-cannot-get-url-refresh)
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) =>
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))
  );
}
/*
 * To-Do: Add a 404 page backup route
 */

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
