const jwt_decode = require("jwt-decode");
const mysql = require("mysql2");

const query = require("../../../database/query");


exports.perfil_clientes = async(req, res) => {
    const token = req.headers.authorization;

    const decode = jwt_decode(token);
    const email = decode.email;

    try{
        const sqlSelect = "SELECT id, nome, idade, CPF, email, dataCriacao FROM clientes WHERE email = ?";
        const selectQuery = mysql.format(sqlSelect, [email]);

        const result = await query.execute_query(selectQuery);
        if (result.length == 0){
            return res.status(404).send({
                id: 0,
                mensagem: "Perfil não foi encontrado."
            });
        }else{
            return res.status(200).send({
                id: 1,
                perfil: result
            });
        }
    }catch(err){
        console.log("Erro:", err);
        return res.status(500).send({
            id: 0,
            mensagem: "Sinto muito, o servidor está passando por alguns problemas",
            erro: err
        })
    }
}