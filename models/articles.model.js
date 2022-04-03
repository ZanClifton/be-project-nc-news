const db = require("../db/connection");

exports.findArticles = async (sort_by = "created_at", order = "DESC") => {
    sort_by = sort_by.toLowerCase();
    order = order.toUpperCase();

    const validSortBy = [
        "created_at", 
        "article_id", 
        "title",
        "topic", 
        "author",
        "votes",
        "comment_count"
    ];
    const validOrder = ["ASC", "DESC"];
    
    if (!validSortBy.includes(sort_by)) {
        return Promise.reject({ 
            status: 400, msg: `use ?sort_by= and add the column name you wish to sort by`})
    }

    if (!validOrder.includes(order)) {
        return Promise.reject({ status: 400, msg: "use ?order=ASC or ?order=DESC" })
    }

    let queryStr = `
    SELECT articles.article_id, articles.title, topic, 
        articles.author, articles.created_at, articles.votes, 
        COUNT(comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order};`;

    const results = await db.query(queryStr);
    return results.rows;
};

exports.findArticle = async (article_id) => {
    let queryStr = `
        SELECT articles.*, COUNT(comment_id)::INT AS comment_count
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

exports.findArticlesByUser = async (username) => {
    let queryStr = `
        SELECT article_id, title, topic, body, created_at, votes 
        FROM articles
        WHERE author = $1;
    `;

    const results = await db.query(queryStr, [username]);
    if (results.rows.length === 0) {
        return Promise.reject({ status: 404, msg: `unable to find articles by ${username}!` });
    }
    return results.rows;
}

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