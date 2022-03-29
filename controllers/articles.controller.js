const { changeArticle } = require("../models/articles.model");

exports.patchArticle = async (req, res, next) => {
    try {
        const { article_id } = req.params

        const article = await changeArticle(req.body, article_id);
        res.send({ article });
    } catch(err) {
        next(err);
    };
};