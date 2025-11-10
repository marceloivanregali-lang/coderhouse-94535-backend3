// argv/server/server.js
import express from "express";
import { initMoongoseDB } from "../../server-dotenv/db-connection.js";
import mocksRouter from "../../routes/mocks.routes.js"; // 👈 Importamos el router
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 8080;
const ENV = process.argv[2] || "development";

// Middleware
app.use(express.json());

// Rutas base
app.use("/api/mocks", mocksRouter); // 👈 Activamos la ruta /api/mocks

// Prueba básica del servidor
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

// Conexión a la DB
initMoongoseDB()
  .then(() => console.log("📦 Base de datos lista"))
  .catch((error) => console.error("❌ Falló la conexión:", error));

app.listen(PORT, () => {
  console.log(`✅ Server OK en puerto ${PORT}, environment = ${ENV}`);
});
