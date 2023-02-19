const mysql = require("mysql2");


// Criar uma conexão com obanco de dados
const db = mysql.createPool({
    connectionLimit: 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true
});

db.getConnection( (err, connection) => {

    if (err) throw (err);

    console.log("Conexão com banco de dados bem sucedida: " + connection.threadId)
    connection.release();
});

module.exports = db;