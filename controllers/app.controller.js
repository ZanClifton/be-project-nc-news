const { 
    findTopics, 
    findArticle } = require("../models/app.model");

exports.getTopics = (req, res, next) => {
    findTopics()
    .then((topics) => {
        res.send({ topics });
    })
    .catch((err) => {
        next(err);
    });
};

exports.getArticle = (req, res, next) => {
    const { article_id } = req.params;
    findArticle(article_id)
    .then((article) => {
        res.send({ article })
    })
    .catch((err) => {
        next(err);
    });
};