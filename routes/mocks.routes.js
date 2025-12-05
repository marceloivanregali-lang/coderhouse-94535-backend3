import { Router } from "express";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Pet from "../models/Pet.js";

const router = Router();

const generateUser = async () => {
  const hashedPassword = await bcrypt.hash("coder123", 10);

  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: hashedPassword,
    role: faker.helpers.arrayElement(["user", "admin"]),
    pets: [],
  };
};

const generatePet = () => ({
  name: faker.person.firstName(),
  specie: faker.helpers.arrayElement(["dog", "cat", "turtle", "hamster"]),
  adopted: faker.datatype.boolean(),
});

router.post("/generateData", async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", req.body);

    const { users = 0, pets = 0 } = req.body;

    if (users === undefined || pets === undefined) {
      return res.status(400).json({
        status: "error",
        message: "Debes enviar users y pets en el body",
      });
    }

    const usersArr = [];
    for (let i = 0; i < users; i++) {
      usersArr.push(await generateUser());
    }

    const petsArr = [];
    for (let i = 0; i < pets; i++) {
      petsArr.push(generatePet());
    }

    const insertedUsers = await User.insertMany(usersArr);
    const insertedPets = await Pet.insertMany(petsArr);

    res.status(201).json({
      status: "success",
      message: `Insertados ${insertedUsers.length} usuarios y ${insertedPets.length} mascotas`,
    });
  } catch (error) {
    console.error("❌ Error generando datos:", error);
    res.status(500).json({
      status: "error",
      message: "Error al generar datos",
      detail: error.message,
    });
  }
});

export default router;
