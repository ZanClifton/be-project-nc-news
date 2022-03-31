const db = require("../db/connection");

exports.findArticles = async () => {
    let queryStr = `
    SELECT articles.article_id, articles.title, topic, 
        articles.author, articles.created_at, articles.votes, 
        COUNT(comments.body) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id, articles.title, topic, 
        articles.author, articles.body, articles.created_at, 
        articles.votes
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

// exports.findArticle = async (article_id, search) => {
//     let queryStr = `SELECT `;
    
//     if (search) {
//         queryStr += `articles.article_id, articles.title, topic, 
//             articles.author, articles.body, articles.created_at, 
//             articles.votes, COUNT(comments.body) AS comment_count
//     FROM articles
//     JOIN comments ON comments.article_id = articles.article_id `
//     } else {   
//         queryStr += `* FROM articles `
//     }
        
//     queryStr += `WHERE articles.article_id = $1`;

//     if (search) {
//         queryStr += ` GROUP BY articles.article_id, articles.title, 
//             topic, articles.author, articles.body, articles.created_at, 
//             articles.votes`
//     }

//     queryStr += `;`

//     // console.log(queryStr, "<< in the model")

//     const results = await db.query(queryStr, [article_id]);
    
//     return results.rows[0];
// }

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

