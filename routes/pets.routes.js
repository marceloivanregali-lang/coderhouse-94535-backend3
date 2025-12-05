import { Router } from "express";
import Pet from "../models/Pet.js";

const router = Router();

// GET - obtener todas las mascotas
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json({ status: "success", payload: pets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// POST - crear una mascota
router.post("/", async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.json({ status: "success", payload: pet });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
