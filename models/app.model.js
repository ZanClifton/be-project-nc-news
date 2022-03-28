const db = require("../db/connection");

exports.findTopics = () => {
    let queryStr = `SELECT * FROM topics;`;

    return db.query(queryStr)
    .then((results) => {
        return results.rows;
    });
};