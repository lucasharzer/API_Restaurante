const mysql = require("mysql2");
const jwt_decode = require("jwt-decode");

const query = require("../../../database/query");


// Remover um prato do cardápio
exports.remover_prato = async(req, res) => {
    const token = req.headers.authorization;
    let cod_produto = req.body.cod;

    const decoded = jwt_decode(token);
    const email = decoded.email;

    try{
        if (cod_produto == undefined || typeof(cod_produto) != "number"){
            return res.status(400).send({
                id: 0,
                mensagem: "codProduto inválido."
            });
        }

        cod_produto = parseInt(cod_produto)

        const sqlSelect = "SELECT * FROM funcionarios WHERE email = ?";
        const selectQuery = mysql.format(sqlSelect, [email]);

        const result = await query.execute_query(selectQuery);
        if (result.length == 0){
            return res.status(401).send({
                id: 0,
                mensagem: "Não autorizado."
            });
        }else{
            const sqlDelete = "DELETE FROM cardapio WHERE codProduto = ?";
            const deleteQuery = mysql.format(sqlDelete, [cod_produto]);

            await query.execute_query(deleteQuery);
            return res.status(200).send({
                id: 1,
                mensagem: "Prato removido com sucesso"
            });
        }
    }catch(err){
        console.log("Erro:", err);
        return res.status(500).send({
            id: 0,
            mensagem: "Sinto muito, o servidor está passando por alguns problemas",
            erro: err
        });
    }
}