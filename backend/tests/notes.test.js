require("dotenv").config();

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;

const app = require("../src/app");

describe("Notes", () => {
  let token;
  let noteId;

  before(async () => {
    const signup = await chai.request(app).post("/api/auth/signup").send({
      name: "Note Tester",
      email: `notetester${Date.now()}@example.com`,
      password: "password123",
    });
    token = signup.body.token;
  });

  it("should reject requests without a login token", async () => {
    const res = await chai.request(app).get("/api/notes");
    expect(res.status).to.equal(401);
  });

  it("should create a note", async () => {
    const res = await chai
      .request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Grocery list", content: "milk, eggs" });
    expect(res.status).to.equal(201);
    expect(res.body.note.title).to.equal("Grocery list");
    noteId = res.body.note.id;
  });

  it("should list only my notes", async () => {
    const res = await chai
      .request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body.notes).to.have.lengthOf(1);
  });

  it("should update a note", async () => {
    const res = await chai
      .request(app)
      .put(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Grocery list (updated)" });
    expect(res.status).to.equal(200);
    expect(res.body.note.title).to.equal("Grocery list (updated)");
  });

  it("should delete a note", async () => {
    const res = await chai
      .request(app)
      .delete(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(204);
  });
});