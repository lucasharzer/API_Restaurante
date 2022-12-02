const jwt_decode = require("jwt-decode");
const db = require("../../database/database");
const mysql = require("mysql2");


// Confirmação do cliente por email
exports.confirmacao_clientes = async(req, res) => {
    const valor_recebido = req.body.valor;
    const token = req.headers.authorization;

    const decoded = jwt_decode(token);
    const email = decoded.email;

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        const sqlSelect = "SELECT id, codEmail, confirmacao FROM clientes WHERE email = ?"
        const selectQuery = mysql.format(sqlSelect, [email])

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release()

                if (err) throw (err);

                if (result.length == 0){
                    return res.status(400).send({
                        id: 0,
                        mensagem: "O código de validação não está mais disponível"
                    });
                }

                const id = result[0].id;
                const valor_enviado = result[0].codEmail;
                const confirmacao = result[0].confirmacao;

                if (confirmacao == 1){
                    return res.status(200).send({
                        id: 1,
                        mensagem: "Cliente já está confirmado."
                    });
                }else{
                    if (valor_enviado != valor_recebido){
                        return res.status(401).send({
                            id: 0, 
                            mensagem: "O código de validação está incorreto."
                        });
                    }else{
                        const sqlUpdate = "UPDATE clientes SET confirmacao = ?, codEmail = ? WHERE id = ?";
                        const updateQuery = mysql.format(sqlUpdate, [1, 0, id])
    
                        connection.query(updateQuery, async(err, result) => {
                            try{
                                connection.release();
    
                                if (err) throw (err);
    
                                return res.status(200).send({
                                    id: 1,
                                    mensagem: "Cliente confirmado com sucesso."
                                });
                            }finally{
                                connection.destroy();
                            }
                        });
                    }
                }
            }finally{
                connection.destroy();
            }
        });
    });
}