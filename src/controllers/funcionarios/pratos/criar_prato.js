const mysql = require("mysql2");
const jwt_decode = require("jwt-decode");

const query = require("../../../database/query");
const Data = require("../../../validation/data");


// Criar prato do cardápio
exports.criar_prato = async(req, res) => {
    const token = req.headers.authorization;
    let nome = req.body.nome;
    let descricao = req.body.descricao;
    let valor = req.body.valor;

    const decode = jwt_decode(token);
    const email = decode.email;

    try{
        if (nome == undefined || nome.length == 0){
            return res.status(400).send({
                id: 0,
                mensagem: "Nome inválido."
            });
        }else{
            if (descricao == undefined || descricao.length == 0){
                return res.status(400).send({
                    id: 0,
                    mensagem: "Descrição inválida."
                });
            }else{
                if (valor == undefined || valor.length == 0 || typeof(valor) != "number"){
                    return res.status(400).send({
                        id: 0,
                        mensagem: "Valor inválido."
                    });
                }
            }
        }

        nome = nome.toString();
        descricao = descricao.toString();
        valor = parseFloat(valor);
        const data = Data();

        const sqlSelect = "SELECT * FROM cardapio WHERE prato = ? AND (SELECT COUNT(*) FROM funcionarios WHERE email = ?) <> 0";
        const selectQuery = mysql.format(sqlSelect, [nome, email]);

        const result = await query.execute_query(selectQuery);
        if (result.length != 0){
            return res.status(409).send({
                id: 0,
                mensagem: "Esse Prato já existe."
            });
        }else{
            const sqlInsert = "INSERT INTO cardapio (prato, descricao, valor, dataCriacao, dataAtualizacao) VALUES (?, ?, ?, ?, ?)";
            const insertQuery = mysql.format(sqlInsert, [nome, descricao, valor, data, data]);

            await query.execute_query(insertQuery);
            return res.status(201).send({
                id: 1,
                mensagem: "Prato criado com sucesso."
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