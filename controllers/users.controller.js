const { findUsers, findUser } = require("../models/users.model");
const { findArticlesByUser } = require("../models/articles.model");

exports.getUsers = async (req, res, next) => {
    try {
        const users = await findUsers();
        res.send({ users });
    } catch (err) {
        next(err);
    };
};

exports.getUser = async (req, res, next) => {
    try {
        const { username } = req.params;

        const user = await findUser(username);

        res.send({ user });
    } catch (err) {
        next(err);
    };
};

exports.getUserArticles = async (req, res, next) => {
    try {
        const { username } = req.params;

        const articles = await findArticlesByUser(username);

        res.send({ articles });
    } catch (err) {
        next(err);
    };
};