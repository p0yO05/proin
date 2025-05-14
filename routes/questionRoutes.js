const express = require("express");
const router = express.Router();
const QuestionController = require("../controller/questionController");

router.get("/", QuestionController.getQuestions);
router.get("/:id", QuestionController.getQuestionById);
router.post("/", QuestionController.addQuestion);
router.put("/:id", QuestionController.updateQuestion);
router.delete("/:id", QuestionController.deleteQuestion);

module.exports = router;
