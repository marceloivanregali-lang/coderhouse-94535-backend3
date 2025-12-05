import Adoption from "../models/Adoption.js";

class AdoptionService {
  // Obtener todas las adopciones
  static async getAll() {
    return await Adoption.find()
      .populate("user", "first_name last_name email")
      .populate("pet", "name specie adopted");
  }

  // Crear una adopción
  static async create(data) {
    // Crear registro de adopción
    const adoption = await Adoption.create(data);

    return adoption;
  }

  // Obtener adopción por ID
  static async getById(id) {
    return await Adoption.findById(id)
      .populate("user", "first_name last_name email")
      .populate("pet", "name specie adopted");
  }

  // Eliminar adopción
  static async delete(id) {
    return await Adoption.findByIdAndDelete(id);
  }
}

export default AdoptionService;
