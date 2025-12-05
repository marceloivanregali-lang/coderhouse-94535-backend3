import UsersModel from "../models/User.js";
import bcrypt from "bcrypt";

class UsersController {
  //  Obtener todos los usuarios
  static async getAllUsers(req, res) {
    try {
      const users = await UsersModel.find();
      res.status(200).json({
        status: "success",
        payload: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  //  Obtener usuario por ID
  static async getUserById(req, res) {
    try {
      const { uid } = req.params;
      const user = await UsersModel.findById(uid);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "Usuario no encontrado",
        });
      }

      res.status(200).json({
        status: "success",
        payload: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  //  Crear usuario
  static async createUser(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;

      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Todos los campos son obligatorios",
        });
      }

      // Validar email existente
      const exists = await UsersModel.findOne({ email });
      if (exists) {
        return res.status(400).json({
          status: "error",
          message: "El email ya está registrado",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UsersModel.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        status: "success",
        payload: newUser,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default UsersController;
