const express = require("express");

const apiRouter = require("./routes/api-router");
const articleRouter = require("./routes/articles-router");
const commentRouter = require("./routes/comments-router");
const topicRouter = require("./routes/topics-router");
const userRouter = require("./routes/users-router");

const app = express(); 

app.use(express.json());

app.use(apiRouter);
app.use(articleRouter);
app.use(commentRouter);
app.use(topicRouter);
app.use(userRouter);

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
        console.log(err, "<< psql 400 handler");
        res.status(400).send({ msg: "bad request!" });
    } else {
        next(err);
    };
});

app.use((err, req, res, next) => {
    const badReq = ["23503"]
    if (badReq.includes(err.code)) {
        console.log(err, "<< psql 404 handler");
        res.status(404).send({ msg: "not found!" });
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