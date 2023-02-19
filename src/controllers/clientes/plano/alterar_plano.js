const mysql = require("mysql2");
const jwt_decode = require("jwt-decode");

const query = require("../../../database/query");


// Alterar plano do cliente
exports.alterar_plano = async(req, res) => {
    const cod_plano = req.body.cod_plano;
    const token = req.headers.authorization;

    const decode = jwt_decode(token);
    const email = decode.email;

    try{
        const sqlSelect = "SELECT codPlano FROM planos";
        const selectQuery = mysql.format(sqlSelect);

        const result = await query.execute_query(selectQuery);

        if (cod_plano == undefined){
            return res.status(400).send({
                id: 0,
                mensagem: "codPlano não pode ser vazio."
            });
        }else{
            let status_cod = 0

            for (pos in result){
                const cod = result[pos].codPlano;
                if (cod_plano == cod){
                    status_cod = 1
                }
            }

            if (status_cod == 0){
                return res.status(400).send({
                    id: 0,
                    mensagem: "codplano inválido."
                });
            }else{
                const sqlUpdate = "UPDATE clientes SET codPlano = ? WHERE email = ?";
                const updateQuery = mysql.format(sqlUpdate, [cod_plano, email]);

                await query.execute_query(updateQuery);
                return res.status(200).send({
                    id: 1,
                    mensagem: "Plano alterado com sucesso."
                });
            }
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