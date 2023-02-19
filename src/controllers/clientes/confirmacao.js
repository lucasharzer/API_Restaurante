const jwt_decode = require("jwt-decode");
const db = require("../../database/database");
const query = require("../../database/query");
const mysql = require("mysql2");


// Confirmação do cliente por email
exports.confirmacao_clientes = async(req, res) => {
    const valor_recebido = req.body.valor;
    const token = req.headers.authorization;

    const decoded = jwt_decode(token);
    const email = decoded.email;

    try{
        const sqlSelect = "SELECT id, codEmail, confirmacao FROM clientes WHERE email = ?";
        const selectQuery = mysql.format(sqlSelect, [email]);

        const result = await query.execute_query(selectQuery);
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
                const updateQuery = mysql.format(sqlUpdate, [1, 0, id]);

                await query.execute_query(updateQuery);
                return res.status(200).send({
                    id: 1,
                    mensagem: "Cliente confirmado com sucesso."
                });
            }
        }
}catch(err){
        console.log("Erro:", err);
        return res.status(500).send({
            id: 0,
            mensagem: "Sinto muito, o servidor está passando por alguns problemas",
            erro: err
        });
    }
}