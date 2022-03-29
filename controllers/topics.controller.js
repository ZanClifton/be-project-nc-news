const { findTopics } = require("../models/topics.model");

exports.getTopics = async (req, res, next) => {
    try {
        const topics = await findTopics();
    
        res.send({ topics });
    }
    catch (err) {
        next(err);
    };
};

