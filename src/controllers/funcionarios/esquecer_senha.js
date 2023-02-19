const mysql = require("mysql2");

const query = require("../../database/query");
const enviarEmail = require("../../send/email");
const gerarCodigo = require("../../send/codigo");
const generateAccessToken = require("../../middlewares/generateAccessToken");


// Esqueci minha senha funcionários
exports.esquecer_senha_funcionarios = async(req, res) => {
    const email = req.body.email;

    try{
        const sqlSelect = "SELECT senha FROM funcionarios WHERE email = ?";
        const selectQuery = mysql.format(sqlSelect, [email]);

        const result = await query.execute_query(selectQuery);
        if (result.length == 0){
            return res.status(404).send({
                id: 0,
                mensagem: "Email não foi encontrado"
            });
        }else{
            valor = gerarCodigo();

            const sqlUpdate = "UPDATE funcionarios SET trocaSenha = ?, codEmail = ? WHERE email = ?";
            const updateQuery = mysql.format(sqlUpdate, [1, valor, email]);

            await query.execute_query(updateQuery);
            const token = generateAccessToken({ 
                email: email 
            });
            
            return res.status(200).send({
                id: 1,
                mensagem: "Cheque o código enviado no email para alterar a senha.",
                accessToken: token
            });
        }
    }catch(err){
        console.log("Erro:", err);
        return res.status(500).send({
            id: 0,
            mensagem: "Sinto muito, o servidor está passando por alguns problemas",
            erro: err
        });
    }finally{
        enviarEmail(email, valor, "Funcionários");
    }
}