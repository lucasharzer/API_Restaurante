const jwt_decode = require("jwt-decode");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const query = require("../../database/query");


// Alterar senha do cliente
exports.trocar_senha_clientes = async(req, res) => {
    const valor_recebido = req.body.valor;
    const nova_senha = await bcrypt.hash(req.body.nova_senha, 12);
    const token = req.headers.authorization;

    const decoded = jwt_decode(token);
    const email = decoded.email;

    try{
        const sqlSelect = "SELECT id, codEmail FROM clientes WHERE email = ?"
        const selectQuery = mysql.format(sqlSelect, [email]);

        const result = await query.execute_query(selectQuery);
        if (result.length == 0){
            return res.status(400).send({
                id: 0,
                mensagem: "O código de troca não está mais disponível"
            });
        }

        const id = result[0].id;
        const valor_enviado = result[0].codEmail;

        if (valor_enviado != valor_recebido){
            return res.status(401).send({
                id: 0, 
                mensagem: "O código de troca está incorreto."
            });
        }else{
            const sqlUpdate = "UPDATE clientes SET trocaSenha = ?, codEmail = ?, senha = ? WHERE id = ?";
            const updateQuery = mysql.format(sqlUpdate, [0, 0, nova_senha, id]);

            if (req.body.nova_senha.length == 0){
                return res.status(400).send({
                    id: 0,
                    mensagem: "A nova senha não pode ser vazia."
                });
            }

            await query.execute_query(updateQuery);
            return res.status(200).send({
                id: 1,
                mensagem: "Senha trocada com sucesso."
            });
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