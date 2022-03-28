const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const app = require("../app");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe("GET /api/topics", () => {
    test("200: returns array of topic objects each with slug and description", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
            res.body.topics.forEach((topic) => {
                // console.log(topic)
                expect(topic).toEqual(
                    expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                );
            });
        });
    });
    test("404: returns an error if the path is not found", () => {
        return request(app)
        .get("/api/toppics")
        .expect(404)
        .then((res) => {
            expect(res.body).toEqual({ msg: "not found!" })
        });
    });
});

describe("GET /api/articles/:article_id", () => {
    test("200: returns a single matching article", () => {
        const article_id = 2;
        return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(200)
        .then((res) => {
            expect(res.body.article).toEqual({
                author: "icellusedkars",
                title: "Sony Vaio; or, The Laptop",
                article_id: 2,
                body: expect.any(String),
                topic: "mitch",
                created_at: "2020-10-16T05:03:00.000Z",
                votes: 0
            })
        });
    });
    test("404: returns an error if the article is not found", () => {
        const article_id = 1000;
        return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(404)
        .then((res) => {
            expect(res.body).toEqual({ msg: "not found!" })
        });
    });
    test("400: returns an error for invalid article id", () => {
        const article_id = "21b4";
        return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(400)
        .then((res) => {
            expect(res.body).toEqual({ msg: "bad request!" })
        });
    });
});