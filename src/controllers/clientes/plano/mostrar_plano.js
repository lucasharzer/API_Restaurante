const mysql = require("mysql2");
const jwt_decode = require("jwt-decode");

const db = require("../../../database/database");


// Mostrar plano do cliente
exports.mostrar_plano = async(req, res) => {

    const token = req.headers.authorization;

    const decode = jwt_decode(token);
    const email = decode.email;

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        const sqlSelect = "SELECT c.id, c.nome, c.CPF, p.codPlano, p.plano, p.valor, p.desconto FROM restaurante.planos p, restaurante.clientes c WHERE p.codPlano = c.codPlano AND c.email = ?";
        const selectQuery = mysql.format(sqlSelect, [email]);

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release();

                if (err) throw (err);

                if (result.length == 0){
                    return res.status(404).send({
                        id: 0,
                        mensagem: "Email não encontrado."
                    });
                }else{
                    return res.status(200).send({
                        id: 1,
                        plano: result
                    });
                }
            }finally{
                connection.destroy();
            }
        });
    });
}