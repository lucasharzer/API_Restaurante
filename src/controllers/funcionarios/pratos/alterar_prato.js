const mysql = require("mysql2");
const jwt_decode = require("jwt-decode");

const query = require("../../../database/query");
const Data = require("../../../validation/data");


// Alterar prato do cardápio
exports.alterar_prato = async(req, res) => {
    const token = req.headers.authorization;
    let cod_produto = req.body.cod;
    let valor = req.body.valor;
    let disponibilidade = req.body.disponibilidade;

    const decoded = jwt_decode(token);
    const email = decoded.email;

    try{
        const sqlSelect = "SELECT * FROM funcionarios WHERE email = ?";
        const selectQuery = mysql.format(sqlSelect, [email]);

        const result = await query.execute_query(selectQuery);
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

            await query.execute_query(updateQuery);
            return res.status(200).send({
                id: 1,
                mensagem: "Prato alterado com sucesso"
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