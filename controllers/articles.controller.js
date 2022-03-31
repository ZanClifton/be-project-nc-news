const { findArticles, findArticle, changeArticle, } = require("../models/articles.model");
const { findComments, createComment } = require("../models/comments.model");

exports.getArticles = async (req, res, next) => {
    try { 
        const articles = await findArticles();

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

exports.postComment = async (req, res, next) => {
    try {
        const { article_id } = req.params
        const { username, body } = req.body

        const comment = await createComment(username, body, article_id);

        res.status(201).send({ comment });

    } catch(err) {
        next(err);
    }
}