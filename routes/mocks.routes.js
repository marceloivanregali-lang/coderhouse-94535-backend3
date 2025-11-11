import { Router } from "express";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Pet from "../models/Pet.js";

const router = Router();

// Funciones auxiliares
const generateUser = async () => {
  const hashedPassword = await bcrypt.hash("coder123", 10);
  const roles = ["user", "admin"];
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: hashedPassword,
    role: roles[Math.floor(Math.random() * roles.length)],
    pets: [],
  };
};

const generatePet = () => ({
  name: faker.animal.dog(),
  species: faker.animal.type(),
});

// ✅ Endpoint para generar usuarios y mascotas
router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

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
      message: `✅ Insertados ${insertedUsers.length} usuarios y ${insertedPets.length} mascotas`,
    });
  } catch (error) {
    console.error("❌ Error generando datos:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error al generar datos" });
  }
});

export default router;
