const mysql = require("mysql2");
const jwt_decode = require("jwt-decode");

const db = require("../../../database/database");
const Data = require("../../../validation/data");


// Alterar prato do cardápio
exports.alterar_prato = async(req, res) => {
    const token = req.headers.authorization;
    let cod_produto = req.body.cod;
    let valor = req.body.valor;
    let disponibilidade = req.body.disponibilidade;

    const decoded = jwt_decode(token);
    const email = decoded.email;

    db.getConnection(async(err, connection) => {
        if (err) throw (err);

        const sqlSelect = "SELECT * FROM funcionarios WHERE email = ?";
        const selectQuery = mysql.format(sqlSelect, [email]);

        connection.query(selectQuery, async(err, result) => {
            try{
                connection.release();

                if (err) throw (err);

                if (result.length == 0){
                    return res.status(401).send({
                        id: 0,
                        mensagem: "Não autorizado."
                    });
                }else{
                    if (cod_produto == undefined || typeof(cod_produto) != "number"){
                        return res.status(400).send({
                            id: 0,
                            mensagem: "codProduto inválido."
                        });
                    }else{
                        if (valor == undefined || valor.length == 0 || typeof(valor) != "number"){
                            return res.status(400).send({
                                id: 0,
                                mensagem: "Valor inválido."
                            });
                        }else{
                            if (disponibilidade == undefined || typeof(disponibilidade) != "number"){
                                return res.status(400).send({
                                    id: 0,
                                    mensagem: "Disponibilidade inválida."
                                });
                            }
                        }
                    }
            
                    cod_produto = parseInt(cod_produto)
                    valor = parseFloat(valor);
                    disponibilidade = parseInt(disponibilidade);
                    const data = Data();
            
                    const sqlUpdate = "UPDATE cardapio SET valor = ?, disponivel = ?, dataAtualizacao = ? WHERE codProduto = ?";
                    const updateQuery = mysql.format(sqlUpdate, [valor, disponibilidade, data, cod_produto]);
            
                    connection.query(updateQuery, async(err, result) => {
                        try{
                            connection.release();
            
                            if (err) throw (err);
            
                            return res.status(200).send({
                                id: 1,
                                mensagem: "Prato alterado com sucesso"
                            });
                        }finally{
                            connection.destroy();
                        }
                    });
                }
            }finally{
                connection.destroy();
            }
        });
    });
}