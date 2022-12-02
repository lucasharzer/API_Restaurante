const jwt_decode = require("jwt-decode");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const db = require("../../../database/database");


// Alterar senha do cliente
exports.alterar_senha_clientes = async(req, res) => {
    const token = req.headers.authorization;
    let senha = req.body.senha;

    const decode = jwt_decode(token);
    const email = decode.email;

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        if (senha == undefined || senha.length == 0){
            return res.status(400).send({
                id: 0,
                mensagem: "Senha inválida."
            });
        }else{
            senha = await bcrypt.hash(req.body.senha.toString(), 12);
            
            const sqlUpdate = "UPDATE clientes SET senha = ? WHERE email = ?";
            const updateQuery = mysql.format(sqlUpdate, [senha, email]);

            connection.query(updateQuery, async(err, result) => {
                try{
                    connection.release();

                    if (err) throw (err);

                    return res.status(200).send({
                        id: 1,
                        mensagem: "Senha alterada com sucesso."
                    });

                }finally{
                    connection.destroy();
                }
            });
        }
    });
}