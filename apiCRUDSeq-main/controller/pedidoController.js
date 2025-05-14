const {Pedido, DetallePedido, Producto} = require("../models");


const pedidoController = {

    obtenerPedido:async (req, res)=>{
        try{
            const pedido = await Pedido.findAll({
                include: [{model: DetallePedido, as:"DetallePedido" , include:
                    [{model: Producto, as: "productos"}]
                }]
            });

            if(!pedido){
            return res.status(404).json({error: "No hay pedidos"})
            }
            res.json(pedido)
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    },

    crearPedido: async(req, res)=>{
        const {cliente, productos} = req.body;
        
        if(!productos || productos.length === 0){
            return res.status(400).json({error: "Debe incluir al menos un producto"});
        }

        try{

            const pedido = await Pedido.create({cliente})
            // return res.status(200).json(pedido)
            let total = 0;
            const detalles = [];

            for(const item of productos){
                const producto = await Producto.findByPk(item.id);
                if(!producto){
                    pedido.destroy();
                    return res.status(404).json({error: `Producto con id ${item.id} no se encuentra`});
                }

                const subtotal = item.cantidad *  producto.precio;
                total += subtotal;

                const detalle = await DetallePedido.create({
                    pedidoFk: pedido.id,
                    productoFk : item.id,
                    cantidad: item.cantidad,
                    precioUnitario: producto.precio,
                    subtotal
                })

                detalles.push(detalle)
            }

            await pedido.update({total})
            return res.status(201).json({
                message:"Pedido Creado",
                pedido,
                detalles
            })
        }catch(error){
            return res.status(500).json({error: error.message})
        }

    }
}


module.exports = pedidoController