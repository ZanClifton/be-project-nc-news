\c nc_news_test

-- SELECT * FROM topics;
-- SELECT * FROM users;
-- SELECT * FROM articles;
-- SELECT * FROM comments;

-- SELECT *
-- FROM articles
-- JOIN comments ON comments.article_id = articles.article_id;

SELECT articles.*, COUNT(comment_id) AS comment_count
        FROM articles
        JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = 1 GROUP BY articles.article_id, articles.title, 
                topic, articles.author, articles.body, articles.created_at, 
                articles.votes;