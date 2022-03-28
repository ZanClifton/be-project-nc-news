const express = require("express");
const { getTopics } = require("./controllers/app.controller");
const app = express(); 

app.use(express.json())

app.get("/api/topics", getTopics);

app.use((req, res, next) => {
    res.status(404).send({ msg: "not found!"});
})

app.use((err, req, res) => {
    // console.log(err, "<< 500 Error")
    res.status(500).send({ msg: "it broke!" })
})

module.exports = app;