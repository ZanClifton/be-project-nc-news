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