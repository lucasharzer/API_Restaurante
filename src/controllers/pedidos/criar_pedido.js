const jwt_decode = require("jwt-decode");
const mysql = require("mysql2");

const query = require("../../database/query");
const Data = require("../../validation/data");


// Criar pedido
exports.criar_pedido = async(req, res) => {
    const token = req.headers.authorization;
    const pedido = req.body.pedido;

    const decode = jwt_decode(token);
    const email = decode.email;

    try{
        const sqlSelect = "SELECT cl.id, pl.desconto, ca.codProduto, ca.valor FROM restaurante.clientes cl, restaurante.cardapio ca, restaurante.planos pl WHERE cl.email = ? AND ca.disponivel = 1 AND cl.codPlano = pl.codPlano";
        const selectQuery = mysql.format(sqlSelect, [email]);

        const result = await query.execute_query(selectQuery);
        let valor = 0.0;

        if (result.length == 0){
            return res.status(404).send({
                id: 0,
                mensagem: "Cliente não encontrado."
            });
        }else{
            if (pedido == undefined){
                return res.status(400).send({
                    id: 0,
                    mensagem: "Pedido não pode ser vazio."
                });
            }else{
                let produtos = [];

                for (j in result){
                    produto_banco = parseInt(result[j].codProduto);
                    valor_banco = parseFloat(result[j].valor);
                    if (pedido.includes(produto_banco)){
                        valor += valor_banco;
                    }
                    produtos.push(produto_banco);
                }
                
                for (i in pedido){
                    produto_req = parseInt(pedido[i]);
                    if (produtos.includes(produto_req) == false){
                        return res.status(400).send({
                            id: 0,
                            mensagem: "Um ou mais itens do pedido são inválidos ou estão indisponíveis. Cheque no cardápio os produtos disponíveis."
                        });
                    }
                }
            }
        }

        const id = result[0].id;
        const quantidade = pedido.length;
        const desconto = result[0].desconto;
        const valor_final = valor*(1-desconto/100);
        const data = Data();

        const sqlInsert = "INSERT INTO pedidos (clienteId, pedido, itens, valor, desconto, valorFinal, dataCriacao) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const insertQuery = mysql.format(sqlInsert, [id, pedido.toString(), quantidade, valor, desconto, valor_final, data]);

        await query.execute_query(insertQuery);
        return res.status(201).send({
            id: 1,
            mensagem: "Pedido criado com sucesso."
        });
    }catch(err){
        console.log("Erro:", err);
        return res.status(500).send({
            id: 0,
            mensagem: "Sinto muito, o servidor está passando por alguns problemas.",
            erro: err
        });
    }
}