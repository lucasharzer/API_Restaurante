const mysql = require("mysql2");

const query = require("../../database/query");


// Exibir os itens disponíveis do cardápio
exports.itens_disponiveis_cardapio = async(req, res) => {

    try{
        const sqlSelect = "SELECT * FROM cardapio WHERE disponivel = ?";
        const selectQuery = mysql.format(sqlSelect, [1]);

        const result = await query.execute_query(selectQuery);
        if (result.length == 0){
            return res.status(200).send({
                id: 1,
                mensagem: "Não há itens."
            });
        }else{
            return res.status(200).send({
                id: 1,
                total: result.length,
                itens: result
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