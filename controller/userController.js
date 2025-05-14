const bcrypt = require("bcryptjs");
const { user } = require("../models");

const UserController = {
  // Obtener todos los usuarios
  getUsers: async (req, res) => {
    try {
      const users = await user.findAll();
      return res.status(200).json({ data: users });
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener usuarios", details: error.message });
    }
  },

  // Obtener usuario por ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const foundUser = await user.findByPk(id);

      if (!foundUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.status(200).json({ data: foundUser });
    } catch (error) {
      return res.status(500).json({ error: "Error al buscar usuario", details: error.message });
    }
  },

  // Crear nuevo usuario
  addUser: async (req, res) => {
    try {
      const { user_name, email, password, phone_number, user_status } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son obligatorios" });
      }

      const existingUser = await user.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Ya existe un usuario con ese email" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await user.create({
        user_name,
        email,
        password: hashedPassword,
        phone_number,
        user_status: user_status || "Activo",
      });

      return res.status(201).json({ message: "Usuario creado correctamente", data: newUser });
    } catch (error) {
      return res.status(500).json({ error: "Error al crear usuario", details: error.message });
    }
  },

  // Actualizar un usuario existente
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_name, email, password, phone_number, user_status } = req.body;

      const foundUser = await user.findByPk(id);
      if (!foundUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      if (user_name) foundUser.user_name = user_name;
      if (email) foundUser.email = email;
      if (phone_number) foundUser.phone_number = phone_number;
      if (user_status) foundUser.user_status = user_status;
      if (password) foundUser.password = await bcrypt.hash(password, 10);

      await foundUser.save();

      return res.status(200).json({ message: "Usuario actualizado correctamente", data: foundUser });
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar usuario", details: error.message });
    }
  },

  // Cambiar estado (Activo/Inactivo)
  changeUserStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      if (!["Activo", "Inactivo"].includes(estado)) {
        return res.status(400).json({ error: "Estado inválido. Use 'Activo' o 'Inactivo'." });
      }

      const foundUser = await user.findByPk(id);
      if (!foundUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      foundUser.user_status = estado;
      await foundUser.save();

      return res.status(200).json({ message: `Estado actualizado a ${estado}`, data: foundUser });
    } catch (error) {
      return res.status(500).json({ error: "Error al cambiar estado", details: error.message });
    }
  },
};

module.exports = UserController;
