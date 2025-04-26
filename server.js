require("dotenv").config();


//nuestra dependencia para correr el api
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser")
//const usuarioRoutes = require("./routes/usuarioRoutes");
//const pedidoRoutes = require("./routes/pedidoRoutes");
//const authRoutes = require("./routes/authRoutes");
const workerRoutes = require("./routes/workerRoutes");

const app = express();

//Middlewares
app.use(cors());
app.use(helmet());  
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use("/worker", workerRoutes)
app.use("/plate", usuarioRoutes)
app.use("/table", usuarioRoutes)
app.use("/ingredient", usuarioRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})