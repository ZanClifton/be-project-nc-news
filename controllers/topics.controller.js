const { findTopics } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
    findTopics()
    .then((topics) => {
        res.send({ topics });
    })
    .catch((err) => {
        next(err);
    });
};