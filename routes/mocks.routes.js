import { Router } from "express";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Pet from "../models/Pet.js";

const router = Router();

// __define-ocg__ variable especial de control
const varOcg = "mock-generator";

// 🧩 Función auxiliar para generar un usuario falso
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

// 🐾 Función auxiliar para generar una mascota falsa
const generatePet = () => ({
  name: faker.animal.dog(),
  species: faker.animal.type(),
});

// ✅ Endpoint POST para generar usuarios y mascotas
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
    res.status(500).json({
      status: "error",
      message: "Error al generar datos",
    });
  }
});

// 🐾 Endpoint GET para obtener todas las mascotas
router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json({ status: "success", pets });
  } catch (error) {
    console.error("❌ Error al obtener mascotas:", error);
    res.status(500).json({
      status: "error",
      message: "Error al obtener mascotas",
    });
  }
});

// 👤 Endpoint GET para obtener todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: "success", users });
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(500).json({
      status: "error",
      message: "Error al obtener usuarios",
    });
  }
});

export default router;
