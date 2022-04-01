const express = require("express");

const { getAPI } = require("./controllers/api.controller")

const { 
    getArticles, 
    getArticle, 
    getArticleComments, 
    patchArticle,
    postComment 
} = require("./controllers/articles.controller");

const { getTopics } = require("./controllers/topics.controller");
const { getUsers } = require("./controllers/users.controller");

const app = express(); 

app.use(express.json())

app.get("/api", getAPI)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id", getArticle);
app.get("/api/articles/:article_id/comments", getArticleComments)
app.get("/api/topics", getTopics);
app.get("/api/users", getUsers);

app.patch("/api/articles/:article_id", patchArticle);

app.post("/api.articles/:article_id/comments", postComment)

app.use((req, res, next) => {
    res.status(404).send({ msg: "not found!"});
});

app.use((err, req, res, next) => {
    if (err.msg && err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        console.log(err, "<< custom handler")
        next(err);
    };
});

app.use((err, req, res, next) => {
    const badReq = ["22P02", "23502"]
    if (badReq.includes(err.code)) {
        console.log(err, "<< psql 400 handler")
        res.status(400).send({ msg: "bad request!" })
    } else {
        next(err);
    };
});

app.use((err, req, res, next) => {
    const badReq = ["23503"]
    if (badReq.includes(err.code)) {
        console.log(err, "<< psql 404 handler")
        res.status(404).send({ msg: "not found!" })
    } else {
        next(err);
    };
});

app.use((err, req, res) => {
    if (err) {
        console.log(err, "<< 500 Error")
        res.status(500).send({ msg: "it broke!" });
    };
});

module.exports = app;