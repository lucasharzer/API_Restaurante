const jwt_decode = require("jwt-decode");
const mysql = require("mysql2");

const db = require("../../../database/database");


exports.perfil_clientes = async(req, res) => {
    const token = req.headers.authorization;

    const decode = jwt_decode(token);
    const email = decode.email;

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        const sqlSelect = "SELECT id, nome, idade, CPF, email, dataCriacao FROM clientes WHERE email = ?";
        const selectQuery = mysql.format(sqlSelect, [email]);

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release();

                if (err) throw (err);

                if (result.length == 0){
                    return res.status(404).send({
                        id: 0,
                        mensagem: "Perfil não foi encontrado."
                    });
                }else{
                    return res.status(200).send({
                        id: 1,
                        perfil: result
                    });
                }
            }finally{
                connection.destroy();
            }
        });
    });
}