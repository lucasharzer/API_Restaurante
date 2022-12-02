require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');

const swaggerFile = require("../src/swagger/swagger_output.json");
const rotas = require("./routes/mains");


// Criar uma API
const app = express();

// Configurações da API
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json({ extended: false, limit: "150mb" }));
app.use("/", rotas);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT;

// Rodar a API
app.listen(port, () => {
    console.log(`Servidor rodando na porta https://localhost:${port} !!!`)
});