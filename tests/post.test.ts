import app from "../server";
import request from "supertest";

describe("POST /post", function () {
  it("responds with json", async () => {
    const signinRes = await request(app)
      .post("/signin")
      .send({ username: "hello", password: "hola" })
      .set("Accept", "application/json");

    const token = signinRes.body.token;

    const res = await request(app)
      .post("/api/post")
      .send({ title: "Test Post", content: "This is a test post", published: true })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(res.body.title).toEqual("Test Post");
  });
});

describe("PUT /post/:id", function () {
  it("responds with json", async () => {
    const signinRes = await request(app)
      .post("/signin")
      .send({ username: "hello", password: "hola" })
      .set("Accept", "application/json");

    const token = signinRes.body.token;

    const createRes = await request(app)
      .post("/api/post")
      .send({ title: "Test Post", content: "This is a test post", published: true })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json");

    const postId = createRes.body.id;

    const res = await request(app)
      .put(`/api/post/${postId}`)
      .send({ title: "Updated Post", content: "This is an updated post", published: false })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(res.body.title).toEqual("Updated Post");
  });
});

describe("DELETE /post/:id", function () {
  it("responds with json", async () => {
    const signinRes = await request(app)
      .post("/signin")
      .send({ username: "hello", password: "hola" })
      .set("Accept", "application/json");

    const token = signinRes.body.token;

    const createRes = await request(app)
      .post("/api/post")
      .send({ title: "Test Post", content: "This is a test post", published: true })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json");

    const postId = createRes.body.id;

    const res = await request(app)
      .delete(`/api/post/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Post deleted successfully");
  });
});

describe("GET /post", function () {
  it("responds with json", async () => {
    const signinRes = await request(app)
      .post("/signin")
      .send({ username: "hello", password: "hola" })
      .set("Accept", "application/json");

    const token = signinRes.body.token;

    const res = await request(app)
      .get("/api/post")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /post/:id", function () {
  it("responds with json", async () => {
    const signinRes = await request(app)
      .post("/signin")
      .send({ username: "hello", password: "hola" })
      .set("Accept", "application/json");

    const token = signinRes.body.token;

    const createRes = await request(app)
      .post("/api/post")
      .send({ title: "Test Post", content: "This is a test post", published: true })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json");

    const postId = createRes.body.id;

    const res = await request(app)
      .get(`/api/post/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(res.body.title).toEqual("Test Post");
  });
});
