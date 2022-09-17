module.exports.security = {
  cors: {
    allRoutes: true,
    allowOrigins: "http://localhost:3000",
    allowCredentials: false,
    allowRequestHeaders: "*",
    allowResponseHeaders: "set-cookie",
  },

  csrf: false,
};
