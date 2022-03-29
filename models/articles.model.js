const db = require("../db/connection");

exports.changeArticle = async (edit, article_id) => {
    const { inc_votes } = edit;

    const results = await db.query(`
    UPDATE articles 
    SET votes = votes + $1 
    WHERE article_id = $2 
    RETURNING *;
    `, [inc_votes, article_id]);
    if (results.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found!" });
    };
    return results.rows[0]; 
};