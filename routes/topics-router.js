const { getTopics } = require("../controllers/topics.controller");
const topicRouter = require("express").Router();

topicRouter.get("/api/topics", getTopics);

module.exports = topicRouter;