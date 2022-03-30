const db = require("../db/connection");

exports.findUsers = async () => {
    try {
    let queryStr = `SELECT username FROM users`;

    const results = await db.query(queryStr);
    return results.rows;
    } catch (err) {
        err(next);
    };
};