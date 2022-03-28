const { findTopics } = require("../models/app.model");

exports.getTopics = (req, res, next) => {
    findTopics()
    .then((topics) => {
        res.send({ topics });
    })
    .catch((err) => {
        next(err);
    });
};