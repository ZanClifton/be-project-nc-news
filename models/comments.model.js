const db = require("../db/connection");

exports.findComments = async (article_id) => {
        let queryStr = `
            SELECT comment_id, votes, created_at, author, body
            FROM comments
            WHERE article_id = $1;
        `;
        
        const results = await db.query(queryStr, [article_id]);
        
        return results.rows;
}

