// argv/server/routes/mocks.router.js
import { Router } from "express";

const router = Router();

// Generador simple de productos "mock"
const makeMockProduct = (idx = 0) => {
  const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${idx}`;
  const price = +(Math.random() * 900 + 10).toFixed(2); // 10.00 - 910.00
  const stock = Math.floor(Math.random() * 100);
  const categories = ["electronics", "fashion", "home", "toys", "books"];
  const category = categories[Math.floor(Math.random() * categories.length)];
  return {
    id,
    title: `Producto Mock ${id.slice(-6)}`,
    description: `Descripción para producto mock ${id.slice(-6)}`,
    price,
    stock,
    category,
    code: `MOCK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    thumbnail: `https://picsum.photos/seed/${id}/320/240`,
    createdAt: new Date().toISOString(),
  };
};

// GET /api/mocks?count=10  -> devuelve un array de mocks (por defecto 10)
router.get("/", (req, res) => {
  const count = Math.max(1, Math.min(100, parseInt(req.query.count) || 10)); // 1..100
  const mocks = Array.from({ length: count }, (_, i) => makeMockProduct(i));
  res.json({ status: "success", count: mocks.length, payload: mocks });
});

// GET /api/mocks/:id -> devuelve un mock único (generado on-the-fly)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  // Generamos un mock consistente con el id pedido
  const mock = {
    id,
    title: `Producto Mock ${id}`,
    description: `Descripción para producto mock ${id}`,
    price: +(Math.random() * 900 + 10).toFixed(2),
    stock: Math.floor(Math.random() * 100),
    category: "mock-category",
    code: `MOCK-${id.slice(0, 6)}`,
    thumbnail: `https://picsum.photos/seed/${id}/320/240`,
    createdAt: new Date().toISOString(),
  };
  res.json({ status: "success", payload: mock });
});

export default router;
