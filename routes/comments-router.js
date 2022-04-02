const { deleteComment } = require("../controllers/comments.controller")
const commentRouter = require('express').Router();

commentRouter.delete("/api/comments/:comment_id", deleteComment);

module.exports = commentRouter;