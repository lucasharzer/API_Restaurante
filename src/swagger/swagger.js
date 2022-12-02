const swaggerAutogen = require('swagger-autogen')();


// Criar o JSON do Swagger
const outputFile = 'src/swagger/swagger_output.json';
const endpointsFiles = ['src/index.js'];

swaggerAutogen(outputFile, endpointsFiles);