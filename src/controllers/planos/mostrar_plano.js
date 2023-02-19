const mysql = require("mysql2");

const query = require("../../database/query");


// Mostrar um plano específico
exports.mostrar_plano = async(req, res) => {
    const cod_plano = req.params.cod;

    try{
        const sqlSelect = "SELECT * FROM planos WHERE codPlano = ?";
        const selectQuery = mysql.format(sqlSelect, [cod_plano]);

        const result = await query.execute_query(selectQuery);
        if (result.length == 0){
            return res.status(200).send({
                id: 1,
                mensagem: "Esse plano não existe."
            });
        }else{
            return res.status(200).send({
                id: 1,
                planos: result
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