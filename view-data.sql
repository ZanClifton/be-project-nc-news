\c nc_news_test

-- SELECT * FROM topics;
-- SELECT * FROM users;
SELECT * FROM articles;
-- SELECT * FROM comments;

-- SELECT *
-- FROM articles
-- JOIN comments ON comments.article_id = articles.article_id;


SELECT articles.article_id, articles.title, topic, 
        articles.author, articles.created_at, articles.votes, 
        COUNT(comments.body) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY created_at ASC;