const { findUsers } = require("../models/users.model");

exports.getUsers = async (req, res, next) => {
    try {
        const users = await findUsers();
        res.send({ users });
    } catch (err) {
        next(err);
    };
};