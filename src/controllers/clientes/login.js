const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const db = require("../../database/database");
const generateAccessToken = require("../../middlewares/generateAccessToken");


// Login do cliente
exports.login_clientes = async(req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        const sqlSelect = "SELECT senha FROM clientes WHERE email = ?";
        const selectQuery = mysql.format(sqlSelect, [email]);

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release();

                if (err) throw (err);

                if (result.length == 0){
                    return res.status(404).send({
                        id: 0,
                        mensagem: "Email não foi encontrado"
                    });
                }

                const senha_banco = result[0].senha;
                
                if (!await bcrypt.compare(senha, senha_banco)){
                    return res.status(401).send({
                        id: 0,
                        mensagem: "Senha incorreta."
                    });
                }else{
                    const token = generateAccessToken({ email: email });

                    return res.status(200).send({
                        id: 1,
                        mensagem: "Login foi feito com sucesso.",
                        accessToken: token
                    });
                }
            }finally{
                connection.destroy();
            }
        });
    });
}