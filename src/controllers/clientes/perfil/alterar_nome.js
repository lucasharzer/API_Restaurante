const jwt_decode = require("jwt-decode");
const mysql = require("mysql2");

const db = require("../../../database/database");


// Alterar nome do cliente
exports.alterar_nome_clientes = async(req, res) => {
    const token = req.headers.authorization;
    let nome = req.body.nome;

    const decode = jwt_decode(token);
    const email = decode.email;

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        if (nome == undefined || nome.length == 0){
            return res.status(400).send({
                id: 0,
                mensagem: "Nome inválido."
            });
        }else{
            nome = req.body.nome.toString();
            
            const sqlUpdate = "UPDATE clientes SET nome = ? WHERE email = ?";
            const updateQuery = mysql.format(sqlUpdate, [nome, email]);

            connection.query(updateQuery, async(err, result) => {
                try{
                    connection.release();

                    if (err) throw (err);

                    return res.status(200).send({
                        id: 1,
                        mensagem: "Nome alterado com sucesso."
                    });

                }finally{
                    connection.destroy();
                }
            });
        }
    });
}