const mysql = require("mysql2");
const jst_decode = require("jwt-decode");

const db = require("../../database/database");


// Listar um pedido específico
exports.listar_pedido = async(req, res) => {
    
    const cod_pedido = req.params.cod;
    const token = req.headers.authorization;

    const decode = jst_decode(token);
    const email = decode.email;

    db.getConnection(async(err, connection) => {
        
        if (err) throw (err);

        const sqlSelect = "SELECT * FROM pedidos WHERE codPedido = ? AND (SELECT COUNT(*) FROM restaurante.funcionarios WHERE email = ?) <> 0";
        const selectQuery = mysql.format(sqlSelect, [cod_pedido, email]);

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release();

                if (err) throw (err);

                if (result.length == 0){
                    return await res.status(404).send({
                        id: 0,
                        mensagem: "Esse pedido não existe."
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