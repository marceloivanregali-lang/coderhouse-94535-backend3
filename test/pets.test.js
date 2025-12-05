import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Pets API", () => {
  let createdPetId = null;

  it("Debe crear una mascota", async () => {
    const newPet = {
      name: "Firulais",
      specie: "dog",
      adopted: false,
    };

    const res = await requester.post("/api/pets").send(newPet);

    expect(res.status).to.equal(201);
    expect(res.body.pet).to.have.property("_id");

    createdPetId = res.body.pet._id;
  });

  it("Debe listar todas las mascotas", async () => {
    const res = await requester.get("/api/pets");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("Debe obtener una mascota por ID", async () => {
    const res = await requester.get(`/api/pets/${createdPetId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
  });
});
