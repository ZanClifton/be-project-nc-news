const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const app = require("../app");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe("ARTICLES", () => {
    describe("GET /api/articles", () => {
        describe("Happy Path", () => {
            test("200: returns array of articles with the comment_count property", async () => {
                const res = await request(app)
                    .get("/api/articles")
                    .expect(200);
                expect(res.body.articles).toHaveLength(12);
                res.body.articles.forEach((article) => {
                    expect(article).toEqual(
                        expect.objectContaining({
                            article_id: expect.any(Number),
                            title: expect.any(String),
                            topic: expect.any(String),
                            author: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(String)
                        })
                    );
                });
            });
        });
        describe("Unhappy Path", () => {
            test("404: returns an error if the path is not found", async () => {
                const res = await request(app)
                    .get("/api/ourtickles")
                    .expect(404);
                expect(res.body).toEqual({ msg: "not found!" });
            });
        });
    });

    describe("GET /api/articles/:article_id", () => {
        describe("Happy Path", () => {
            test("200: returns a single matching article", async () => {
                const article_id = 2;

                const res = await request(app)
                .get(`/api/articles/${article_id}`)
                .expect(200);
            expect(res.body.article).toMatchObject({
                author: "icellusedkars",
                title: "Sony Vaio; or, The Laptop",
                article_id: 2,
                body: expect.any(String),
                topic: "mitch",
                created_at: "2020-10-16T05:03:00.000Z",
                votes: 0
            });
        });
    });
        describe("Unhappy Path", () => {
            test("404: returns an error if the article is not found", async () => {
                const article_id = 1000;
                const res = await request(app)
                .get(`/api/articles/${article_id}`)
                .expect(404);
            expect(res.body).toEqual({ msg: "not found!" });
            });
            test("400: returns an error for invalid article id", async () => {
                const article_id = "21b4";

                const res = await request(app)
                .get(`/api/articles/${article_id}`)
                .expect(400);
            expect(res.body).toEqual({ msg: "bad request!" });
            });
        });
    });

    describe("GET /api/articles/:article_id", () => {
        describe("Happy Path", () => {
            test("200: returns the article response object with comment_count added", async () => {
                const article_id = 1;
        
                const res = await request(app)
                    .get(`/api/articles/${article_id}`)
                    .expect(200);
        
                expect(res.body.article).toEqual({
                    article_id: 1,
                    title: "Living in the shadow of a great man",
                    topic: "mitch",
                    author: "butter_bridge",
                    body: "I find this existence challenging",
                    created_at: "2020-07-09T20:11:00.000Z",
                    votes: 100,
                    comment_count: "11"  
                });
            });
        });
        describe("Unhappy Path", () => {
            test("404: returns an error if the article is not found", async () => {
                const article_id = 500
        
                const res = await request(app)
                    .get(`/api/articles/${article_id}`)
                    .expect(404);
                expect(res.body).toEqual({ msg: "not found!" });
            });
            test("400: returns an error if the article id is the wrong type", async () => {
                const article_id = "46a1"
        
                const res = await request(app)
                    .get(`/api/articles/${article_id}`)
                    .expect(400);
                expect(res.body).toEqual({ msg: "bad request!" });
            });
        });
    });

    describe("GET /api/articles/:article_id/comments", () => {
        describe("Happy Path", () => {
            test("200: returns an array of comments for the given article_id", async () => {
                const article_id = 1;
        
                const res = await request(app)
                    .get(`/api/articles/${article_id}/comments`)
                    .expect(200);
    
                    expect(res.body.comments.length).toBe(11)
                    res.body.comments.forEach((comment) => {
                        expect(comment).toMatchObject({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String) 
                        });
                    });
            });
            test("200: returns an empty array if article_id is found with no comments", async () => {
                const article_id = 2;
        
                const res = await request(app)
                    .get(`/api/articles/${article_id}/comments`)
                    .expect(200);
                console.log(res.body)
                expect(res.body.comments).toEqual([]);
            });
        });
        describe("Unhappy Path", () => {
            test("404: returns an error if the article is not found", async () => {
                const article_id = 500
        
                const res = await request(app)
                    .get(`/api/articles/${article_id}/comments`)
                    .expect(404);
                expect(res.body).toEqual({ msg: "not found!" });
            });
            test("400: returns an error if the article id is the wrong type", async () => {
                const article_id = "46a1"
        
                const res = await request(app)
                    .get(`/api/articles/${article_id}/comments`)
                    .expect(400);
                expect(res.body).toEqual({ msg: "bad request!" });
            });
        });
    });
    
    describe("PATCH /api/articles/:article_id", () => {
        describe("Happy Path", () => {
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
        });
        describe("Unhappy Path", () => {
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
    });
    describe("POST /api.articles/:article_id/comments", () => {
        describe("Happy Path", () => {
            test("201: post new comment to article", async () => {
                const article_id = 2;
                const commentBody = {
                    username: "butter_bridge",
                    body: "You should be looking everything up. I have very limited brain space and I want to save as much of it as possible for understanding. You're not supposed to know all these things; there's just too much."
                };
                
                const res = await request(app)
                    .post(`/api.articles/${article_id}/comments`)
                    .send(commentBody)
                    .expect(201)
    
                const expected = {
                    comment_id: expect.any(Number),
                    author: "butter_bridge",
                    body: "You should be looking everything up. I have very limited brain space and I want to save as much of it as possible for understanding. You're not supposed to know all these things; there's just too much.",
                    article_id: 2,
                    votes: expect.any(Number),
                    created_at: expect.any(String)
                }
    
                expect(res.body.comment).toMatchObject(expected);
            });
        });
        describe("Unhappy Path", () => {
            test("404: returns error if article_id is not found", async () => {
                const article_id = 500;
                const commentBody = {
                    username: "butter_bridge",
                    body: "You should be looking everything up. I have very limited brain space and I want to save as much of it as possible for understanding. You're not supposed to know all these things; there's just too much."
                };
                
                const res = await request(app)
                    .post(`/api.articles/${article_id}/comments`)
                    .send(commentBody)
                    .expect(404)
    
                expect(res.body).toEqual({ msg: "not found!" });
            });
            test("404: returns error if author is not found", async () => {
                const article_id = 2;
                const commentBody = {
                    username: "pail_shrelington",
                    body: "You should be looking everything up. I have very limited brain space and I want to save as much of it as possible for understanding. You're not supposed to know all these things; there's just too much."
                };
                
                const res = await request(app)
                    .post(`/api.articles/${article_id}/comments`)
                    .send(commentBody)
                    .expect(404)
    
                expect(res.body).toEqual({ msg: "not found!" });
            });
            test("400: returns error if invalid article_id is used", async () => {
                const article_id = "21b4";
                const commentBody = {
                    username: "butter_bridge",
                    body: "You should be looking everything up. I have very limited brain space and I want to save as much of it as possible for understanding. You're not supposed to know all these things; there's just too much."
                };
                
                const res = await request(app)
                    .post(`/api.articles/${article_id}/comments`)
                    .send(commentBody)
                    .expect(400)
    
                expect(res.body).toEqual({ msg: "bad request!" });
            });
            test("400: returns error if incorrect key names are used", async () => {
                const article_id = 2;
                const commentBody = {
                    author: "butter_bridge",
                    bawdy: "You should be looking everything up. I have very limited brain space and I want to save as much of it as possible for understanding. You're not supposed to know all these things; there's just too much."
                };
                
                const res = await request(app)
                    .post(`/api.articles/${article_id}/comments`)
                    .send(commentBody)
                    .expect(400)
    
                expect(res.body).toEqual({ msg: "bad request!" });
            });
            test("400: returns error if body is empty", async () => {
                const article_id = 2;
                const commentBody = {};
                
                const res = await request(app)
                    .post(`/api.articles/${article_id}/comments`)
                    .send(commentBody)
                    .expect(400)
    
                expect(res.body).toEqual({ msg: "bad request!" });
            });
        });
    });    
});

describe("TOPICS", () => {
    describe("GET /api/topics", () => {
        describe("Happy Path", () => {
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
        });
    });
});

describe("USERS", () => {
    describe("GET /api/users", () => {
        describe("Happy Path", () => {
            test("200: returns array of user objects each with the username property", async () => {
                const res = await request(app)
                    .get("/api/users")
                    .expect(200);
                expect(res.body.users.length).toBe(4);
                res.body.users.forEach((user) => {
                    expect(user).toEqual(
                        expect.objectContaining({
                            username: expect.any(String)
                        })
                    );
                });
            });
        });
    });
});

