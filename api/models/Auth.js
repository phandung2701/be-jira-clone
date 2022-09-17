/**
 * Auth.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require("bcrypt");

module.exports = {
  attributes: {
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: "string",
      required: true,
    },
    active: {
      type: "boolean",
      defaultsTo: false,
    },
  },
  beforeCreate(values, next) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        sails.log.error(err);
        return next();
      }

      bcrypt.hash(values.password, salt, (err, hash) => {
        if (err) {
          sails.log.error(err);
          return next();
        }
        values.password = hash;
        return next();
      });
    });
  },

  comparePassword(password, encryptedPassword) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, encryptedPassword, (err, match) => {
        if (err) {
          sails.log.error(err);
          return reject("Something went wrong!");
        }
        if (match) return resolve();
        else return reject("Incorect email or password");
      });
    });
  },
};
