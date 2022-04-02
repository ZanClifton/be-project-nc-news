const db = require("../db/connection");

exports.findUsers = async () => {
    let queryStr = `SELECT username FROM users`;

    const results = await db.query(queryStr);
    return results.rows;
};

exports.findUser = async (username) => {

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
};

