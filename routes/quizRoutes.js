const express = require("express");
const router = express.Router();
const QuizController = require("../controller/quizContrroller");

router.get("/", QuizController.getQuizzes);
router.get("/:id", QuizController.getQuizById);
router.post("/", QuizController.addQuiz);
router.put("/:id", QuizController.updateQuiz);
router.delete("/:id", QuizController.deleteQuiz);

module.exports = router;
