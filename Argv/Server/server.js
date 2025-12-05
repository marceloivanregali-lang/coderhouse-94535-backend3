import express from "express";
import "dotenv/config.js";

// Conexión a la base de datos
import { initMoongoseDB } from "../../server-dotenv/db-connection.js";

// Routers
import mocksRouter from "../../routes/mocks.routes.js";
import adoptionRouter from "../../routes/Adoption.routes.js";
import usersRouter from "../../routes/users.routes.js";
import petsRouter from "../../routes/pets.routes.js";
import { swaggerServe, swaggerSetup } from "../../config/swagger.js";

const app = express();
const PORT = process.env.PORT || 8080;
const ENV = process.argv[2] || "development";

//  CONEXIÓN A BASE DE DATOS

initMoongoseDB()
  .then(() => console.log("📦 Base de datos lista"))
  .catch((error) => console.error("❌ Falló la conexión:", error));

//  MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerServe, swaggerSetup);

// Log simple
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

//  RUTAS

app.use("/api/mocks", mocksRouter);
app.use("/api/adoptions", adoptionRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

//  INICIO DEL SERVIDOR

app.listen(PORT, () => {
  console.log(`✅ Server OK en puerto ${PORT} | Environment = ${ENV}`);
});
