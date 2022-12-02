const mysql = require("mysql2");

const db = require("../../database/database");


// Exibir todos os itens do cardápio
exports.itens_cardapio = async(req, res) => {

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        const sqlSelect = "SELECT * FROM cardapio";
        const selectQuery = mysql.format(sqlSelect);

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release();

                if (err) throw (err);

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
            }finally{
                connection.destroy();
            }
        });
    });
}