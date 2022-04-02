const { getUsers, getUser } = require("../controllers/users.controller");
const userRouter = require("express").Router();
  
userRouter.get("/api/users", getUsers);
userRouter.get("/api/users/:username", getUser);

  
  module.exports = userRouter;