const { findArticles, findArticle, changeArticle,  } = require("../models/articles.model");
const { findComments } = require("../models/comments.model");

exports.getArticles = async (req, res, next) => {
    try { 
        const articles = await findArticles();
        console.log(res, "<< res in controller")
        res.send({ articles });
    } catch(err) {
        next(err);
    };
};

exports.getArticle = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const { search } = req.query;

        const article = await findArticle(article_id, search);
        res.send({ article })
    }
    catch (err) {
        next(err);
    };
};

exports.getArticleComments = async (req, res, next) => {
    try {
        const { article_id } = req.params;

        const dbQueries = [findComments(article_id)];
        if (article_id) dbQueries.push(findArticle(article_id));

        const results = await Promise.all(dbQueries);
        const comments = results[0];
        
        res.send({ comments });
    } catch (err) {
        next(err)
    };
};

exports.patchArticle = async (req, res, next) => {
    try {
        const { article_id } = req.params

        const article = await changeArticle(req.body, article_id);
        res.send({ article });
    } catch(err) {
        next(err);
    };
};