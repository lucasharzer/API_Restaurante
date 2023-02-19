const mysql = require("mysql2");
const jst_decode = require("jwt-decode");

const query = require("../../database/query");


// Listar todos os pedidos
exports.listar_pedidos = async(req, res) => {
    const token = req.headers.authorization;

    const decode = jst_decode(token);
    const email = decode.email;

    try{
        const sqlSelect = "SELECT * FROM pedidos WHERE (SELECT COUNT(*) FROM restaurante.funcionarios WHERE email = ?) <> 0";
        const selectQuery = mysql.format(sqlSelect, [email]);

        const result = await query.execute_query(selectQuery);
        if (result.length == 0){
            return await res.status(404).send({
                id: 0,
                mensagem: "Não há pedidos."
            });
        }else{
            return await res.status(200).send({
                id: 1,
                pedidos: result
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