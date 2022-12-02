const mysql = require("mysql2");

const db = require("../../database/database");


// Mostrar um plano específico
exports.mostrar_plano = async(req, res) => {

    const cod_plano = req.params.cod;

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        const sqlSelect = "SELECT * FROM planos WHERE codPlano = ?";
        const selectQuery = mysql.format(sqlSelect, [cod_plano]);

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release();

                if (err) throw (err);

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
            }finally{
                connection.destroy();
            }
        });
    });
}