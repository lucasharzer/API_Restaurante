const jwt_decode = require("jwt-decode");
const mysql = require("mysql2");

const query = require("../../../database/query");


// Alterar nome do funcionário
exports.alterar_nome_funcionarios = async(req, res) => {
    const token = req.headers.authorization;
    let nome = req.body.nome;

    const decode = jwt_decode(token);
    const email = decode.email;

    try{
        if (nome == undefined || nome.length == 0){
            return res.status(400).send({
                id: 0,
                mensagem: "Nome inválido."
            });
        }else{
            nome = req.body.nome.toString();
            
            const sqlUpdate = "UPDATE funcionarios SET nome = ? WHERE email = ?";
            const updateQuery = mysql.format(sqlUpdate, [nome, email]);

            await query.execute_query(updateQuery);
            return res.status(200).send({
                id: 1,
                mensagem: "Nome alterado com sucesso."
            });
        }
    }catch(err){
        console.log("Erro:", err);
        return res.status(500).send({
            id: 0,
            mensagem: "Sinto muito, o servidor está passando por alguns problemas.",
            erro: err
        });
    }
}