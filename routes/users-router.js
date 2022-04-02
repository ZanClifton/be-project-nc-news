const { getUsers, getUser, getUserArticles } = require("../controllers/users.controller");
const userRouter = require("express").Router();
  
userRouter.get("/api/users", getUsers);
userRouter.get("/api/users/:username", getUser);
userRouter.get("/api/users/:username/articles", getUserArticles);
  
module.exports = userRouter;