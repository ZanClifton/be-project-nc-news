const db = require("../db/connection");

exports.findTopics = async () => {
    let queryStr = `SELECT * FROM topics;`;

    return db.query(queryStr)
    .then((results) => {
        return results.rows;
    });
};

