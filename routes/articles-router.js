const { 
    getArticles, 
    getArticle, 
    getArticleComments, 
    patchArticle,
    postComment 
} = require("../controllers/articles.controller");
const articleRouter = require("express").Router();

articleRouter.get("/api/articles", getArticles);
articleRouter.get("/api/articles/:article_id", getArticle);
articleRouter.get("/api/articles/:article_id/comments", getArticleComments);

articleRouter.patch("/api/articles/:article_id", patchArticle);

articleRouter.post("/api.articles/:article_id/comments", postComment);

module.exports = articleRouter;
