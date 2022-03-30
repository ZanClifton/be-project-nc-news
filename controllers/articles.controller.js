const { findArticles, findArticle, changeArticle,  } = require("../models/articles.model");

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

exports.patchArticle = async (req, res, next) => {
    try {
        const { article_id } = req.params

        const article = await changeArticle(req.body, article_id);
        res.send({ article });
    } catch(err) {
        next(err);
    };
};