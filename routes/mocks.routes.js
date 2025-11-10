import { Router } from "express";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const router = Router();

// __define-ocg__ variable especial para identificar el mock
const varOcg = "mock-generator";

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

// ✅ Endpoint para generar 50 usuarios mock
router.get("/mockingusers", async (req, res) => {
  try {
    const usuarios = [];

    for (let i = 0; i < 50; i++) {
      usuarios.push(await generateUser());
    }

    res.status(200).json({
      status: "success",
      usuarios,
    });
  } catch (error) {
    console.error("❌ Error generando usuarios mock:", error);
    res.status(500).json({
      status: "error",
      message: "Error al generar usuarios mock",
    });
  }
});

export default router;
