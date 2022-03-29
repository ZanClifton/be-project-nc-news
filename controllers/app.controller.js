const { 
    findTopics, 
    findArticle } = require("../models/app.model");

exports.getTopics = async (req, res, next) => {
    try {
        const topics = await findTopics();
    
        res.send({ topics });
    }
    catch (err) {
        next(err);
    };
};

exports.getArticle = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const article = await findArticle(article_id)
        res.send({ article })
    }
    catch (err) {
        next(err);
    };
};