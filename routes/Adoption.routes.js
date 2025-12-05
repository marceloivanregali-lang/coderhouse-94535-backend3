import { Router } from "express";
import {
  getAllAdoptions,
  getAdoptionById,
  createAdoption,
  deleteAdoption,
} from "../controllers/adoption.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Endpoints de adopciones
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Adoption:
 *       type: object
 *       required:
 *         - petId
 *         - userId
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la adopción
 *         petId:
 *           type: string
 *           description: ID de la mascota adoptada
 *         userId:
 *           type: string
 *           description: ID del usuario que adopta
 *         date:
 *           type: string
 *           format: date
 *           description: Fecha de la adopción
 *         status:
 *           type: string
 *           description: Estado de la adopción
 *           enum: [pending, completed, cancelled]
 *       example:
 *         id: "64f1c2a9f1b2e1a5c6d7e8f0"
 *         petId: "64f1c2a9f1b2e1a5c6d7e8f9"
 *         userId: "64f1c2a9f1b2e1a5c6d7e8f8"
 *         date: "2025-12-05"
 *         status: "pending"
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Adoption'
 */
router.get("/", getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtener una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       404:
 *         description: Adopción no encontrada
 */
router.get("/:aid", getAdoptionById);

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Adoption'
 *     responses:
 *       201:
 *         description: Adopción creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       400:
 *         description: Error en la validación
 */
router.post("/", createAdoption);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   delete:
 *     summary: Eliminar una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción
 *     responses:
 *       200:
 *         description: Adopción eliminada correctamente
 *       404:
 *         description: Adopción no encontrada
 */
router.delete("/:aid", deleteAdoption);

export default router;
