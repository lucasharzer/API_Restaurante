const jwt_decode = require("jwt-decode");
const mysql = require("mysql2");

const db = require("../../../database/database");


// Alterar idade do funcionário
exports.alterar_idade_funcionarios = async(req, res) => {
    const token = req.headers.authorization;
    let idade = req.body.idade;

    const decode = jwt_decode(token);
    const email = decode.email;

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        if (idade == undefined || idade.length == 0 || typeof(idade) != "number"){
            return res.status(400).send({
                id: 0,
                mensagem: "Idade inválida."
            });
        }else{
            idade = parseInt(req.body.idade);
            
            const sqlUpdate = "UPDATE funcionarios SET idade = ? WHERE email = ?";
            const updateQuery = mysql.format(sqlUpdate, [idade, email]);

            connection.query(updateQuery, async(err, result) => {
                try{
                    connection.release();

                    if (err) throw (err);

                    return res.status(200).send({
                        id: 1,
                        mensagem: "Idade alterada com sucesso."
                    });

                }finally{
                    connection.destroy();
                }
            });
        }
    });
}