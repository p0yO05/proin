const { Producto } = require('../models');

const productoController = {
    obtenerProducto: async (req, res) => {
        try {
            const productos = await Producto.findAll();
            if (!productos) {
                return res.status(404).json({ error: "No hay productos" });
            }
            res.json(productos);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = productoController