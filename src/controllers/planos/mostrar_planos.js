const mysql = require("mysql2");

const query = require("../../database/query");


// Mostrar todos os planos
exports.mostrar_planos = async(req, res) => {
    try{
        const sqlSelect = "SELECT * FROM planos";
        const selectQuery = mysql.format(sqlSelect);

        const result = await query.execute_query(selectQuery);
        if (result.length == 0){
            return res.status(200).send({
                id: 1,
                mensagem: "Não há planos."
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