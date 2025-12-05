import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Users API", () => {
  let createdUserId = null;

  it("Debe crear un usuario correctamente", async () => {
    const newUser = {
      first_name: "Test",
      last_name: "User",
      email: "testuser@mail.com",
      password: "123456",
      role: "user",
    };

    const res = await requester.post("/api/users").send(newUser);

    expect(res.status).to.equal(201);
    expect(res.body.user).to.have.property("_id");

    createdUserId = res.body.user._id;
  });

  it("Debe obtener todos los usuarios", async () => {
    const res = await requester.get("/api/users");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("Debe obtener un usuario por ID", async () => {
    const res = await requester.get(`/api/users/${createdUserId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
  });
});
