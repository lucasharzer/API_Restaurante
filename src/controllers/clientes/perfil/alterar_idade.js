const jwt_decode = require("jwt-decode");
const mysql = require("mysql2");

const query = require("../../../database/query");


// Alterar idade do cliente
exports.alterar_idade_clientes = async(req, res) => {
    const token = req.headers.authorization;
    let idade = req.body.idade;

    const decode = jwt_decode(token);
    const email = decode.email;
    
    try{
        if (idade == undefined || idade.length == 0 || typeof(idade) != "number"){
            return res.status(400).send({
                id: 0,
                mensagem: "Idade inválida."
            });
        }else{
            idade = parseInt(req.body.idade);
            
            const sqlUpdate = "UPDATE clientes SET idade = ? WHERE email = ?";
            const updateQuery = mysql.format(sqlUpdate, [idade, email]);

            await query.execute_query(updateQuery);
            return res.status(200).send({
                id: 1,
                mensagem: "Idade alterada com sucesso."
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