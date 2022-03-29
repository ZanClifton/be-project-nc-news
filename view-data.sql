\c nc_news_test

SELECT * FROM topics;
SELECT * FROM users;
SELECT * FROM articles;
SELECT * FROM comments;

-- SELECT DISTINCT articles.article_id, comment_id
-- FROM articles
-- JOIN comments ON comments.article_id = articles.article_id;