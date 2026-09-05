require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;

const app = require("../src/app");

describe("Auth", () => {
  const testUser = {
    name: "Test User",
    email: `test${Date.now()}@example.com`,
    password: "password123",
  };

  it("should sign up a new user", async () => {
    const res = await chai.request(app).post("/api/auth/signup").send(testUser);
    expect(res.status).to.equal(201);
    expect(res.body.token).to.be.a("string");
  });

  it("should reject login with wrong password", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "wrongpassword" });
    expect(res.status).to.equal(401);
  });
});