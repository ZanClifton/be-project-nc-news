const db = require("../db/connection");

exports.findTopics = async () => {
    let queryStr = `SELECT * FROM topics;`;

    const results = await db.query(queryStr)
    
    return results.rows;
};

