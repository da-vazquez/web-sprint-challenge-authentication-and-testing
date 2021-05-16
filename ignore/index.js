/* const supertest = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")



describe("dad jokes integration tests", () => {
  it("return error message for dad jokes when user not authenticated", async () => {
    const res = await supertest(server).get("/api/jokes")
    expect(res.statusCode).toBe(401)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Token required")
  })
})
describe("registration integration tests", () => {
  it("should allow a new user to register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({username: "json statham", password: "hello"})
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.username).toBe("json statham")
    expect(res.body.id).toBeDefined()
    afterEach(async () => {
      await db("users").where("username", "json statham").del()
    }) 
  })
  it("should not allow a user to register without a password", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({username: "bobby", password: ""})
    expect(res.statusCode).toBe(401)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Username and Password required")
    expect(res.body.id).not.toBeDefined()
  })
})
describe("login integration tests", () => {
  it("should allow an existing user to login", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({username: "test", password: "test"})
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toContain("Welcome back test")
  })
  it("should not allow an existing user to login with incorrect password", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({username: "test", password: "test123"})
    expect(res.statusCode).toBe(401)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toContain("invalid credentials")
  })
}) */