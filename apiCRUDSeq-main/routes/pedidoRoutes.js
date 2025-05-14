const express = require("express");
const router = express.Router();
const pedidoController = require("../controller/pedidoController");
const authService = require("../services/authService");

router.post("/", authService, pedidoController.crearPedido)
router.get("/", authService, pedidoController.obtenerPedido)


module.exports= router;