module.exports.routes = {
  // auth
  "POST /api/v1/auth/register": "AuthController.register",
  "POST /api/v1/auth/login": "AuthController.login",
  "GET /api/v1/auth/user": "AuthController.user",
  "POST /api/v1/auth/refreshToken": "AuthController.refreshToken",
  "POST /api/v1/auth/verifyAccount": "AuthController.activeAccount",
  // project

  "POST /api/v1/search": "ProjectController.searchProject",
  // task
  "GET /api/v1/project/task/list/:id": "TaskController.getListTask",
  "POST /api/v1/project/search": "TaskController.searchTask",

  // user
  "GET /api/v1/user/information": "UserController.getInformation",
  "PUT /api/v1/user/updateInformation": "UserController.updateInformation",
  "GET /api/v1/board": "BoardController.getTaskPosition",
  "POST /api/v1/task/updatePosition": "TaskController.updatePosition",
};
