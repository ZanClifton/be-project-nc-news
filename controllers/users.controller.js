const { findUsers, findUser } = require("../models/users.model");

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

