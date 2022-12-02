const mysql = require("mysql2");

const db = require("../../database/database");


// Exibir um item específico do cardápio
exports.item_cardapio = async(req, res) => {
    const cod_produto = parseInt(req.params.cod);

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        const sqlSelect = "SELECT * FROM cardapio WHERE codProduto = ?";
        const selectQuery = mysql.format(sqlSelect, [cod_produto]);

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release();

                if (err) throw (err);

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
            }finally{
                connection.destroy();
            }
        });
    });
}