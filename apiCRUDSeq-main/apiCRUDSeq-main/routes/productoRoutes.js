const express = require("express");
const router = express.Router();
const productoController = require("../controller/productoController");


router.get("/", productoController.obtenerProducto);

module.exports = router;