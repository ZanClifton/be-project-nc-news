\c nc_news_test

-- SELECT * FROM topics;
-- SELECT * FROM users;
-- SELECT * FROM articles;
-- SELECT * FROM comments;

-- SELECT *
-- FROM articles
-- JOIN comments ON comments.article_id = articles.article_id;

\echo 'accessing comment count from comments table'

SELECT COUNT(body) AS comment_count 
FROM comments 
WHERE article_id = 1;

\echo 'accessing the requisite columns from articles'

SELECT article_id, title, topic, author, body, created_at, votes
FROM articles
WHERE article_id = 1;

\echo 'joining the tables'

SELECT * FROM articles
FULL OUTER JOIN comments ON comments.article_id = articles.article_id
WHERE articles.article_id = 1;

\echo 'combining the 3 queries to return the full info required'

SELECT articles.article_id, articles.title, topic, articles.author, articles.body, articles.created_at, articles.votes, COUNT(comments.body) AS comment_count
FROM articles
JOIN comments ON comments.article_id = articles.article_id
WHERE articles.article_id = 1
GROUP BY articles.article_id, articles.title, topic, articles.author, articles.body, articles.created_at, articles.votes;

\echo 'from the models file'

SELECT articles.article_id, articles.title, topic, 
                articles.author, articles.body, articles.created_at, 
                articles.votes, COUNT(comments.body) AS comment_count
        FROM articles
        JOIN comments ON comments.article_id = articles.article_id WHERE article_id = $1 GROUP BY articles.article_id, articles.title, 
                topic, articles.author, articles.body, articles.created_at, 
                articles.votes;