import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// __define-ocg__
// ✅ Carga el archivo .env desde la carpeta actual (server-dotenv)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

export const initMoongoseDB = async () => {
  try {
    const varOcg = process.env.MONGO_URL; // 🔹 Variable de entorno

    if (!varOcg) {
      throw new Error("❌ No se encontró MONGO_URI en el archivo .env");
    }

    await mongoose.connect(varOcg);
    console.log("✅ Conectado correctamente a MongoDB Atlas");
  } catch (error) {
    console.error("🚨 Error conectando a la DB:", error);
    throw error;
  }
};
