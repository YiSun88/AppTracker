/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

require('dotenv').config();

/*
 * TO-DO: For the unique index of username, need to handle the error with duplicate indices (MongoServerError: E11000 duplicate key error collection: test.users index: username_1 dup key: { username: "yisun" })
 */
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Cannot use arrow function for the callback here as it will invalid the this keyword's reference.
userSchema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(
      /*
       * process.env always provides a string
       */
      parseInt(process.env.SALT_WORK_FACTOR, 10),
      (saltError, salt) => {
        if (saltError) {
          return next(saltError);
        }
        bcrypt.hash(user.password, salt, (hashError, hash) => {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          return next();
        });
      }
    );
  } else {
    return next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
