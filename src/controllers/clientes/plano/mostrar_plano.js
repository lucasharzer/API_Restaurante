const mysql = require("mysql2");
const jwt_decode = require("jwt-decode");

const query = require("../../../database/query");


// Mostrar plano do cliente
exports.mostrar_plano = async(req, res) => {
    const token = req.headers.authorization;

    const decode = jwt_decode(token);
    const email = decode.email;

    try{
        const sqlSelect = "SELECT c.id, c.nome, c.CPF, p.codPlano, p.plano, p.valor, p.desconto FROM restaurante.planos p, restaurante.clientes c WHERE p.codPlano = c.codPlano AND c.email = ?";
        const selectQuery = mysql.format(sqlSelect, [email]);

        const result = await query.execute_query(selectQuery);
        if (result.length == 0){
            return res.status(404).send({
                id: 0,
                mensagem: "Email não encontrado."
            });
        }else{
            return res.status(200).send({
                id: 1,
                plano: result
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