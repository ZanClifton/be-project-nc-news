const express = require("express");

const { 
    getArticles, 
    getArticle, 
    getArticleComments, 
    patchArticle 
} = require("./controllers/articles.controller");

const { getTopics } = require("./controllers/topics.controller");
const { getUsers } = require("./controllers/users.controller");

const app = express(); 

app.use(express.json())

app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id", getArticle);
app.get("/api/articles/:article_id/comments", getArticleComments)
app.get("/api/topics", getTopics);
app.get("/api/users", getUsers);

app.patch("/api/articles/:article_id", patchArticle);

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
    if (err.code === "22P02") {
        console.log(err, "<< psql handler")
        res.status(400).send({ msg: "bad request!" })
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