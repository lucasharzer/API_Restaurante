const mysql = require("mysql2");

const db = require("../../database/database");
const enviarEmail = require("../../send/email");
const gerarCodigo = require("../../send/codigo");
const generateAccessToken = require("../../middlewares/generateAccessToken");


// Esqueci minha senha funcionários
exports.esquecer_senha_funcionarios = async(req, res) => {
    const email = req.body.email;

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        const sqlSelect = "SELECT senha FROM funcionarios WHERE email = ?";
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
                }else{
                    valor = gerarCodigo();

                    const sqlUpdate = "UPDATE funcionarios SET trocaSenha = ?, codEmail = ? WHERE email = ?";
                    const updateQuery = mysql.format(sqlUpdate, [1, valor, email]);

                    connection.query(updateQuery, async(err, result) => {
                        try{
                            connection.release();

                            if (err) throw (err);

                            const token = generateAccessToken({ email: email })

                            return res.status(200).send({
                                id: 1,
                                mensagem: "Cheque o código enviado no email para alterar a senha.",
                                accessToken: token
                            });
                        }finally{
                            connection.destroy();
                        }
                    });
                    enviarEmail(email, valor, "Funcionários");
                }
            }finally{
                connection.destroy();
            }
        });
    });
}