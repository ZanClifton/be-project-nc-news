\c nc_news_test

-- SELECT * FROM topics;
-- SELECT * FROM users;
SELECT * FROM articles;
-- SELECT * FROM comments;

-- SELECT author, body FROM comments;

SELECT article_id, title, topic, body, created_at, votes 
FROM articles
WHERE topic = 'coding';

-- article_id, title, topic, body, created_at, votes 