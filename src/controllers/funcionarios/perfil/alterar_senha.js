const jwt_decode = require("jwt-decode");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const query = require("../../../database/query");


// Alterar senha do funcionário
exports.alterar_senha_funcionarios = async(req, res) => {
    const token = req.headers.authorization;
    let senha = req.body.senha;

    const decode = jwt_decode(token);
    const email = decode.email;

    try{
        if (senha == undefined || senha.length == 0){
            return res.status(400).send({
                id: 0,
                mensagem: "Senha inválida."
            });
        }else{
            senha = await bcrypt.hash(req.body.senha.toString(), 12);
            
            const sqlUpdate = "UPDATE funcionarios SET senha = ? WHERE email = ?";
            const updateQuery = mysql.format(sqlUpdate, [senha, email]);

            await query.execute_query(updateQuery);
            return res.status(200).send({
                id: 1,
                mensagem: "Senha alterada com sucesso."
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