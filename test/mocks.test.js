import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Mocks API", () => {
  it("Debe generar usuarios y mascotas de prueba", async () => {
    const body = { users: 3, pets: 3 };

    const res = await requester.post("/api/mocks/generateData").send(body);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("status", "success");
  });
});
