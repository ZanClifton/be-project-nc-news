const db = require("../db/connection");

exports.findTopics = () => {
    let queryStr = `SELECT * FROM topics;`;

    return db.query(queryStr)
    .then((results) => {
        return results.rows;
    });
};

exports.findArticle = (article_id) => {
    let queryStr = `
    SELECT * FROM articles
    WHERE article_id = $1;
    `;

    return db.query(queryStr, [article_id])
    .then((results) => {
        if(results.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "not found!"})
        }
        return results.rows[0]
    })
}

