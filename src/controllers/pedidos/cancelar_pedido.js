const mysql = require("mysql2");
const jst_decode = require("jwt-decode");

const db = require("../../database/database");


// Cancelar pedido
exports.cancelar_pedido = async(req, res) => {
    
    const cod_pedido = req.body.cod_pedido;
    const token = req.headers.authorization;

    const decode = jst_decode(token);
    const email = decode.email;

    db.getConnection(async(err, connection) => {
        
        if (err) throw (err);

        const sqlSelect = "SELECT pe.codPedido FROM restaurante.funcionarios fu, restaurante.pedidos pe WHERE email = ?";
        const selectQuery = mysql.format(sqlSelect, [email]);

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release();

                if (err) throw (err);

                if (result.length == 0){
                    return await res.status(404).send({
                        id: 0,
                        mensagem: "Funcionário não encontrado."
                    });
                }else{
                    if (cod_pedido == undefined){
                        return await res.status(400).send({
                            id: 0,
                            mensagem: "CodPedido não pode ser vazio."
                        });
                    }else{
                        let pedidos = [];
                        for (i in result){
                            const pedido = result[i].codPedido;
                            pedidos.push(pedido);
                        }

                        if (!pedidos.includes(cod_pedido)){
                            return await res.status(400).send({
                                id: 0,
                                mensagem: "codPedido inválido."
                            });
                        }else{
                            const sqlUpdate = "DELETE FROM pedidos WHERE codPedido = ?";
                            const updateQuery = mysql.format(sqlUpdate, [cod_pedido]);

                            connection.query(updateQuery, async(err, result) => {
                                try{
                                    connection.release();

                                    if (err) throw (err);

                                    return res.status(200).send({
                                        id: 1,
                                        mensagem: "Pedido foi cancelado com sucesso."
                                    });
                                }finally{
                                    connection.destroy();
                                }
                            });
                        }
                    }
                }
            }finally{
                connection.destroy();
            }
        });
    });
}