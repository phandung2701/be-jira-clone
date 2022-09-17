module.exports.policies = {
  "*": ["isAuthorized"],
  AuthController: {
    register: true,
    login: true,
    activeAccount: true,
    refreshToken: true,
  },
};
