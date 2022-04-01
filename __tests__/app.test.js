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
                            comment_count: expect.any(Number)
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
                    comment_count: 11  
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

describe("GET /api/articles?[queries]", () => {
    describe("Happy Path", () => {
        describe("ORDER DESCENDING (DEFAULT)", () => {
            test("200: returns array of articles sorted by date(default)", async () => {
                const res = await request(app)
                    .get("/api/articles")
                    .expect(200);

                const desc = { descending: true }
                
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("created_at", desc);         
            });
            test("200: returns array of articles sorted by article_id", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=article_id")
                    .expect(200);
    
                    const desc = { descending: true }
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("article_id", desc);         
            });
            test("200: returns array of articles sorted by title", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=title")
                    .expect(200);
    
                    const desc = { descending: true }
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("title", desc);         
            });
            test("200: returns array of articles sorted by topic", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=topic")
                    .expect(200);
    
                    const desc = { descending: true }
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("topic", desc);         
            });
            test("200: returns array of articles sorted by author", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=author")
                    .expect(200);
    
                    const desc = { descending: true }
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("author", desc);         
            });
            test("200: returns array of articles sorted by votes", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=votes")
                    .expect(200);
    
                    const desc = { descending: true }
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("votes", desc);         
            });
            test("200: returns array of articles sorted by comment_count", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=comment_count")
                    .expect(200);
    
                    const desc = { descending: true }
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("comment_count", desc);         
            });
        });
        describe("ORDER ASCENDING", () => {
            test("200: returns array of articles sorted by date(default), ascending", async () => {
                const res = await request(app)
                    .get("/api/articles?order=asc")
                    .expect(200);
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("created_at");         
            });
            test("200: returns array of articles sorted by article_id", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=article_id&order=asc")
                    .expect(200);
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("article_id");         
            });
            test("200: returns array of articles sorted by title", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=title&order=asc")
                    .expect(200);
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("title");         
            });
            test("200: returns array of articles sorted by topic", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=topic&order=asc")
                    .expect(200);
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("topic");         
            });
            test("200: returns array of articles sorted by author", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=author&order=asc")
                    .expect(200);
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("author");         
            });
            test("200: returns array of articles sorted by votes", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=votes&order=asc")
                    .expect(200);
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("votes");         
            });
            test("200: returns array of articles sorted by comment_count", async () => {
                const res = await request(app)
                    .get("/api/articles?sort_by=comment_count&order=asc")
                    .expect(200);
    
                expect(res.body.articles).toHaveLength(12);
                expect(res.body.articles).toBeSortedBy("comment_count");         
            });
        });    
    
    });
    describe("Unhappy Path", () => {
        test("400: incorrect sort_by value", async () => {
            const res = await request(app)
                .get("/api/articles?sort_by=not_this")
                .expect(400);
            expect(res.body).toEqual({
                 msg: `use ?sort_by= and add the column name you wish to sort by` });
        });
        test("400: incorrect order value", async () => {
            const res = await request(app)
                .get("/api/articles?order=not_this_either")
                .expect(400);
            expect(res.body).toEqual({
                 msg: "use ?order=ASC or ?order=DESC" });
        });
    });
});