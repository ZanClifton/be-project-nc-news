const db = require("../db/connection");

exports.findTopics = async () => {
    let queryStr = `SELECT * FROM topics;`;

    const results = await db.query(queryStr);
    return results.rows;
};

exports.findArticle = async (article_id) => {
    let queryStr = `
    SELECT * FROM articles
    WHERE article_id = $1;
    `;

    const results = await db.query(queryStr, [article_id]);
    if (results.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found!" });
    }
    return results.rows[0];
}

