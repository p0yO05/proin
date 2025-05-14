const { quiz, user } = require("../models");

const QuizController = {
  // Obtener todos los quizzes
  getQuizzes: async (req, res) => {
    try {
      const quizzes = await quiz.findAll({ include: [{ model: user, as: "creator" }] });
      return res.status(200).json({ data: quizzes });
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener quizzes", details: error.message });
    }
  },

  // Obtener quiz por ID
  getQuizById: async (req, res) => {
    try {
      const { id } = req.params;
      const foundQuiz = await quiz.findByPk(id, { include: [{ model: user, as: "creator" }] });

      if (!foundQuiz) {
        return res.status(404).json({ error: "Quiz no encontrado" });
      }

      return res.status(200).json({ data: foundQuiz });
    } catch (error) {
      return res.status(500).json({ error: "Error al buscar quiz", details: error.message });
    }
  },

  // Crear nuevo quiz
  addQuiz: async (req, res) => {
    try {
      const { title, description, userId } = req.body;

      if (!title || !userId) {
        return res.status(400).json({ error: "Título y userId son obligatorios" });
      }

      const newQuiz = await quiz.create({ title, description, userId });

      return res.status(201).json({ message: "Quiz creado correctamente", data: newQuiz });
    } catch (error) {
      return res.status(500).json({ error: "Error al crear quiz", details: error.message });
    }
  },

  // Actualizar un quiz existente
  updateQuiz: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const foundQuiz = await quiz.findByPk(id);
      if (!foundQuiz) {
        return res.status(404).json({ error: "Quiz no encontrado" });
      }

      if (title) foundQuiz.title = title;
      if (description) foundQuiz.description = description;

      await foundQuiz.save();

      return res.status(200).json({ message: "Quiz actualizado correctamente", data: foundQuiz });
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar quiz", details: error.message });
    }
  },

  // Eliminar un quiz
  deleteQuiz: async (req, res) => {
    try {
      const { id } = req.params;

      const foundQuiz = await quiz.findByPk(id);
      if (!foundQuiz) {
        return res.status(404).json({ error: "Quiz no encontrado" });
      }

      await foundQuiz.destroy();

      return res.status(200).json({ message: "Quiz eliminado correctamente" });
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar quiz", details: error.message });
    }
  },
};

module.exports = QuizController;
