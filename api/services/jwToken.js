"use strict";

const jwt = require("jsonwebtoken");
const tokenSecret = "secretissecret";
const refreshToken_secret = "refreshToken";
module.exports = {
  // Generates a token from supplied payload
  accessToken(payload) {
    return jwt.sign(payload, tokenSecret, {
      expiresIn: process.env.EXPIRESIN_ACCESSTOKEN,
    });
  },
  refreshToken(payload) {
    return jwt.sign(payload, refreshToken_secret, {
      expiresIn: process.env.EXPIRESIN_REFRESHTOKEN,
    });
  },

  // Verifies token on a request
  verify(token, callback) {
    return jwt.verify(token, tokenSecret, {}, callback);
  },
  verifyRefreshToken(token, callback) {
    return jwt.verify(token, refreshToken_secret, {}, callback);
  },
};
