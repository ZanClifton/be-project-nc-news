const db = require("../db/connection");

exports.findArticles = async () => {
    let queryStr = `
    SELECT articles.article_id, articles.title, topic, 
        articles.author, articles.created_at, articles.votes, 
        COUNT(comments.body) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC;
    `;

    const results = await db.query(queryStr);
    return results.rows;
};

exports.findArticle = async (article_id) => {
    let queryStr = `
        SELECT articles.*, COUNT(comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id 
        WHERE articles.article_id = $1 
        GROUP BY articles.article_id;
    `;
    const results = await db.query(queryStr, [article_id]);
    if (results.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found!" });
    }

    return results.rows[0];
};

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

exports.createComment = async (username, body, article_id) => {
    
}