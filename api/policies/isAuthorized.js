"use strict";

module.exports = async (req, res, next) => {
  let token;

  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    if (token.length <= 0)
      return res.json(401, { err: "Format is Authorization: Bearer [token]" });
  } else if (req.param("token")) {
    token = req.param("token");
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.json(401, { err: "No Authorization header was found" });
  }
  const findToken = await sails.models.token.findOne({ accessToken: token });
  if (!findToken) {
    return res.status(401).json("Invalid Token!");
  }
  jwToken.verify(token, function (err, auth) {
    if (err) return res.json(401, { err: "Invalid Token!" });
    req.auth = auth;
    next();
  });
};
