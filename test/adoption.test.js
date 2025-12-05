import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Tests funcionales - Adoption Router", () => {
  let createdAdoptionId = null;

  //  Test: Crear adopción
  it("POST /api/adoptions/ debe crear una adopción", async () => {
    const mockData = {
      user: "6913ca6203e79ec3e8044567",
      pet: "6913ca6303e79ec3e804456d",
    };

    const { status, body } = await requester
      .post("/api/adoptions")
      .send(mockData);

    expect(status).to.equal(200);
    expect(body.status).to.equal("success");
    expect(body.payload).to.have.property("_id");

    createdAdoptionId = body.payload._id;
  });

  it("GET /api/adoptions/ debe devolver una lista", async () => {
    const { status, body } = await requester.get("/api/adoptions");

    expect(status).to.equal(200);
    expect(body.status).to.equal("success");
    expect(body.payload).to.be.an("array");
  });

  it("GET /api/adoptions/:aid debe devolver una adopción por ID", async () => {
    const { status, body } = await requester.get(
      `/api/adoptions/${createdAdoptionId}`
    );

    expect(status).to.equal(200);
    expect(body.payload).to.have.property("_id");
  });

  it("GET /api/adoptions/:aid con ID incorrecto debe dar error", async () => {
    const { status } = await requester.get(`/api/adoptions/12345`);
    expect(status).to.equal(400);
  });

  it("DELETE /api/adoptions/:aid debe eliminar una adopción", async () => {
    const { status, body } = await requester.delete(
      `/api/adoptions/${createdAdoptionId}`
    );

    expect(status).to.equal(200);
    expect(body.message).to.include("eliminada");
  });

  it("DELETE /api/adoptions/:aid debe dar error si no existe", async () => {
    const { status } = await requester.delete(
      `/api/adoptions/${createdAdoptionId}`
    );
    expect(status).to.equal(404);
  });
});
