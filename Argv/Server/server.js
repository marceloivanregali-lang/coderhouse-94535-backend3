import express from "express";
import { initMoongoseDB } from "../../server-dotenv/db-connection.js";
import mocksRouter from "../../routes/mocks.routes.js";
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 8080;
const ENV = process.argv[2] || "development";

initMoongoseDB()
  .then(() => console.log("📦 Base de datos lista"))
  .catch((error) => console.error("❌ Falló la conexión:", error));

app.use(express.json());
app.use("/api", mocksRouter);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server OK en puerto ${PORT}, environment = ${ENV}`);
});
