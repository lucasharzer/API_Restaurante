const mysql = require("mysql2");
const jst_decode = require("jwt-decode");

const db = require("../../database/database");


// Listar pedidos entregues
exports.listar_pedidos_entregues = async(req, res) => {
    
    const token = req.headers.authorization;

    const decode = jst_decode(token);
    const email = decode.email;

    db.getConnection(async(err, connection) => {
        
        if (err) throw (err);

        const sqlSelect = "SELECT * FROM pedidos WHERE entrega = 1 AND (SELECT COUNT(*) FROM restaurante.funcionarios WHERE email = ?) <> 0";
        const selectQuery = mysql.format(sqlSelect, [email]);

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release();

                if (err) throw (err);

                if (result.length == 0){
                    return await res.status(404).send({
                        id: 0,
                        mensagem: "Não há pedidos."
                    });
                }else{
                    return await res.status(200).send({
                        id: 1,
                        pedidos: result
                    });
                }
            }finally{
                connection.destroy();
            }
        });
    });
}