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

exports.findUser = async (username) => {
    try {
        let queryStr = `
            SELECT * 
            FROM users
            WHERE username = $1;
        `;

    const results = await db.query(queryStr, [username]);
    if (results.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found!" });
    }

    return results.rows[0];
    } catch (err) {
        err(next);
    };
};