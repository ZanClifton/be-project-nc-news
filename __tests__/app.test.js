const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const app = require("../app");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe("GET /api/topics", () => {
    test("200: returns array of topic objects each with slug and description", async () => {
        const res = await request(app)
            .get("/api/topics")
            .expect(200);
        res.body.topics.forEach((topic) => {
            expect(topic).toEqual(
                expect.objectContaining({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
            );
        });
    });
    test("404: returns an error if the path is not found", async () => {
        const res = await request(app)
            .get("/api/toppics")
            .expect(404);
        expect(res.body).toEqual({ msg: "not found!" });
    });
});

describe("PATCH /api/articles/:article_id", () => {
    test("200: increases vote count on article and returns the updated article", async () => {
        const newVote = 1
        const amendVote = { inc_votes: newVote }
        const article_id = 5

        const res = await request(app)
            .patch(`/api/articles/${article_id}`)
            .send(amendVote)
            .expect(200);
        expect(res.body.article).toEqual({
            article_id: 5,
            title: "UNCOVERED: catspiracy to bring down democracy",
            topic: "cats",
            author: "rogersop",
            body: "Bastet walks amongst us, and the cats are taking arms!",
            created_at: "2020-08-03T13:14:00.000Z",
            votes: 1
        });
    });
    test("200: decreases vote count on article and returns the updated article", async () => {
        const newVote = -1
        const amendVote = { inc_votes: newVote }
        const article_id = 1

        const res = await request(app)
            .patch(`/api/articles/${article_id}`)
            .send(amendVote)
            .expect(200);
        expect(res.body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 99
        });
    });
    test("404: returns an error if the article is not found", async () => {
        const newVote = 1
        const amendVote = { inc_votes: newVote }
        const article_id = 500

        const res = await request(app)
            .patch(`/api/articles/${article_id}`)
            .send(amendVote)
            .expect(404);
        expect(res.body).toEqual({ msg: "not found!" });
    });
    test("400: returns an error if the article id is the wrong type", async () => {
        const newVote = 1
        const amendVote = { inc_votes: newVote }
        const article_id = "46a1"

        const res = await request(app)
            .patch(`/api/articles/${article_id}`)
            .send(amendVote)
            .expect(400);
        expect(res.body).toEqual({ msg: "bad request!" });
    });
    test("400: returns an error if the article body is the wrong type", async () => {
        const newVote = "23f4"
        const amendVote = { inc_votes: newVote }
        const article_id = 1

        const res = await request(app)
            .patch(`/api/articles/${article_id}`)
            .send(amendVote)
            .expect(400);
        expect(res.body).toEqual({ msg: "bad request!" });
    });
});

describe("GET /api/users", () => {
    test("200: returns array of user objects each with the username property", async () => {
        const res = await request(app)
            .get("/api/users")
            .expect(200);
        res.body.users.forEach((user) => {
            expect(user).toEqual(
                expect.objectContaining({
                    username: expect.any(String)
                })
            );
        });
    });
    test("404: returns an error if the path is not found", async () => {
        const res = await request(app)
            .get("/api/yusarz")
            .expect(404);
        expect(res.body).toEqual({ msg: "not found!" });
    });
});