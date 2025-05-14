const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController");
const authService =  require("../services/authService");


router.get("/", usuarioController.getUsers);
router.post("/addUser", usuarioController.addUser);
router.post("/:id",authService, usuarioController.updateUser);
router.post("/ChangeStatus/:id", authService,usuarioController.changeUserStatus);
router.get("/:id", authService,usuarioController.getUserById);

module.exports = router;