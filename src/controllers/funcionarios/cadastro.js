const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const query = require("../../database/query");
const Validar_cpf = require("../../validation/cpf");
const Validar_email = require("../../validation/email");
const Data = require("../../validation/data");
const enviarEmail = require("../../send/email");
const gerarCodigo = require("../../send/codigo");
const generateAccessToken = require("../../middlewares/generateAccessToken");


// Cadastro de funcionários
exports.cadastro_funcionarios = async(req, res) => {
    const nome = req.body.nome;
    let idade = req.body.idade;
    let cpf = req.body.cpf;
    const email = req.body.email;
    const senha = await bcrypt.hash(req.body.senha, 12);
    const confirmar_senha = req.body.confirmar_senha;

    try{
        const sqlSelect = "SELECT * FROM funcionarios WHERE email = ?"
        const selectQuery = mysql.format(sqlSelect, [email]);

        const result = await query.execute_query(selectQuery);
        if (result.length != 0){
            return res.status(409).send({
                id: 0,
                mensagem: "Email já cadastrado."
            });
        }else{
            // Tratativa: idade
            if (typeof(idade) == "number"){
                idade = parseInt(idade);
            }else{
                return res.status(400).send({
                    id: 0,
                    mensagem: "Idade inválida."
                });
            }

            // Tratativa: cpf
            cpf = Validar_cpf(cpf)
            if (!cpf){
                return res.status(400).send({
                    id: 0,
                    mensagem: "CPF inválido."
                });
            }

            // Tratativa: email
            if (!Validar_email(email)){
                return res.status(400).send({
                    id: 0,
                    mensagem: "Email inválido."
                });
            }

            // Tratativa: senha
            if (req.body.senha.length == 0){
                return res.status(400).send({
                    id: 0,
                    mensagem: "A senha não pode ser vazia."
                });
            }else{
                if (!await bcrypt.compare(confirmar_senha, senha)){
                    return res.status(400).send({
                        id: 0,
                        mensagem: "A senha deve ser igual a confirmação da senha."
                    });
                }
            }

            // Data
            const data = Data();
            
            // Valor
            valor = gerarCodigo()

            // Token
            const token = generateAccessToken({ 
                email: email 
            })

            const sqlInsert = "INSERT INTO funcionarios (nome, idade, CPF, email, senha, codEmail, dataCriacao) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const insertQuery = mysql.format(sqlInsert, [nome.toString().trim(), idade, cpf, email.toString().trim(), senha, valor, data]);

            await query.execute_query(insertQuery);
            return res.status(201).send({
                id: 1,
                mensagem: "Funcionário cadastrado com sucesso. Cheque o código de validação enviado no seu email para confirmar o cadastro.",
                accessToken: token
            });
        }
    }catch(err){
        console.log("Erro:", err);
        return res.status(500).send({
            id: 0,
            mensagem: "Sinto muito, o servidor está passando por alguns problemas",
            erro: err
        });
    }finally{
        enviarEmail(email, valor, "Funcionário");
    }
}