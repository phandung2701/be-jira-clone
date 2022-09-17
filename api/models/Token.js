/**
 * Token.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    idUser: {
      type: "string",
      unique: true,
      required: true,
    },
    accessToken: {
      type: "string",
    },
    refreshToken: {
      type: "string",
    },
    expiresIn: {
      type: "string",
    },
  },
};
