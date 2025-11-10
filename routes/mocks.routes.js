import { Router } from "express";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const router = Router();

// __define-ocg__ ejemplo de variable especial
const varOcg = "mock-generator"; // Nombre simbólico

// Función para generar un usuario falso
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

// Endpoint para generar usuarios
router.get("/mockingusers/:num", async (req, res) => {
  const { num } = req.params;
  const cantidad = parseInt(num);

  if (isNaN(cantidad) || cantidad <= 0) {
    return res
      .status(400)
      .json({ error: "El parámetro debe ser un número mayor a 0" });
  }

  const usuarios = [];

  for (let i = 0; i < cantidad; i++) {
    usuarios.push(await generateUser());
  }

  res.json({ usuarios });
});

export default router;
