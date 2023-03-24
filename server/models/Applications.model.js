const mongoose = require('mongoose');

const { Schema } = mongoose;

/*
 * Need to export this activitySchema as well? or activities can be added as object?
 * https://stackoverflow.com/questions/70481291/adding-element-inside-nested-array-in-mongoose
 */
const activitySchema = new Schema({
  activity: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const applicationSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  dateSubmitted: {
    type: Date,
  },
  status: {
    type: String,
  },
  nextDue: {
    type: Date,
  },
  history: {
    type: [activitySchema],
  },
  note: {
    type: String,
  },
  link: {
    type: String,
  },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
