const mysql = require("mysql2");

const db = require("../../database/database");


// Mostrar todos os planos
exports.mostrar_planos = async(req, res) => {

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        const sqlSelect = "SELECT * FROM planos";
        const selectQuery = mysql.format(sqlSelect);

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release();

                if (err) throw (err);

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
            }finally{
                connection.destroy();
            }
        });
    });
}