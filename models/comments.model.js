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

exports.createComment = async (username, body, article_id) => {
    let queryStr = `
        INSERT INTO comments 
            (author, body, article_id)
        VALUES
            ($1, $2, $3)
        RETURNING *;
    `;
    
    const results = await db.query(queryStr, [username, body, article_id]);
 
    return results.rows[0]
}

exports.removeComment = async (comment_id) => {
    let queryStr = `
        DELETE FROM comments
        WHERE comment_id = $1
        `;

    const results = await db.query(queryStr, [comment_id]);

    return results.rows;
}