import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// __define-ocg__
// ✅ Carga el archivo .env desde la carpeta actual (server-dotenv)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
};
