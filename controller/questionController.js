const { question, quiz } = require("../models");

const QuestionController = {
  // Obtener todas las preguntas
  getQuestions: async (req, res) => {
    try {
      const questions = await question.findAll({ include: [{ model: quiz, as: "quiz" }] });
      return res.status(200).json({ data: questions });
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener preguntas", details: error.message });
    }
  },

  // Obtener pregunta por ID
  getQuestionById: async (req, res) => {
    try {
      const { id } = req.params;
      const foundQuestion = await question.findByPk(id, { include: [{ model: quiz, as: "quiz" }] });

      if (!foundQuestion) {
        return res.status(404).json({ error: "Pregunta no encontrada" });
      }

      return res.status(200).json({ data: foundQuestion });
    } catch (error) {
      return res.status(500).json({ error: "Error al buscar pregunta", details: error.message });
    }
  },

  // Crear nueva pregunta
  addQuestion: async (req, res) => {
    try {
      const { question_text, quizId } = req.body;

      if (!question_text || !quizId) {
        return res.status(400).json({ error: "Texto de la pregunta y quizId son obligatorios" });
      }

      const newQuestion = await question.create({ question_text, quizId });

      return res.status(201).json({ message: "Pregunta creada correctamente", data: newQuestion });
    } catch (error) {
      return res.status(500).json({ error: "Error al crear pregunta", details: error.message });
    }
  },

  // Actualizar una pregunta existente
  updateQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      const { question_text } = req.body;

      const foundQuestion = await question.findByPk(id);
      if (!foundQuestion) {
        return res.status(404).json({ error: "Pregunta no encontrada" });
      }

      if (question_text) foundQuestion.question_text = question_text;

      await foundQuestion.save();

      return res.status(200).json({ message: "Pregunta actualizada correctamente", data: foundQuestion });
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar pregunta", details: error.message });
    }
  },

  // Eliminar una pregunta
  deleteQuestion: async (req, res) => {
    try {
      const { id } = req.params;

      const foundQuestion = await question.findByPk(id);
      if (!foundQuestion) {
        return res.status(404).json({ error: "Pregunta no encontrada" });
      }

      await foundQuestion.destroy();

      return res.status(200).json({ message: "Pregunta eliminada correctamente" });
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar pregunta", details: error.message });
    }
  },
};

module.exports = QuestionController;
