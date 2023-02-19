const mysql = require("mysql2");

const query = require("../../database/query");


// Exibir um item específico do cardápio
exports.item_cardapio = async(req, res) => {
    const cod_produto = parseInt(req.params.cod);

    try{
        const sqlSelect = "SELECT * FROM cardapio WHERE codProduto = ?";
        const selectQuery = mysql.format(sqlSelect, [cod_produto]);

        const result = await query.execute_query(selectQuery);
        if (result.length == 0){
            return res.status(200).send({
                id: 1,
                mensagem: "Não há esse item."
            });
        }else{
            return res.status(200).send({
                id: 1,
                item: result
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