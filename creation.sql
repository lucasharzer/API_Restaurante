-- Criar o banco de dados:
CREATE DATABASE restaurante;

-- Selecionar o banco de dados
USE restaurante;

-- Criar tabela cardapio
CREATE TABLE cardapio
(
	codProduto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    prato VARCHAR(50) NOT NULL,
    descricao TEXT,
    valor DECIMAL(18,2),
    disponivel INT DEFAULT 1,
    dataCriacao DATETIME,
    dataAtualizacao DATETIME
);

-- Criar tabela pedido
CREATE TABLE pedidos
(
	codPedido INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    clienteId INT NOT NULL,
    pedido TEXT NOT NULL,
    itens INT NOT NULL,
    valor DECIMAL(18,2),
    desconto DECIMAL(18,2),
    valorFinal DECIMAL(18,2),
    entrega INT NOT NULL DEFAULT 0,
    dataCriacao DATETIME,
    dataEntrega DATETIME,
    FOREIGN KEY (clienteId) REFERENCES clientes(id)
);

-- Criar tabela clientes
CREATE TABLE clientes
(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    codPlano INT NOT NULL,
    nome VARCHAR(200) NOT NULL,
    idade INT NOT NULL,
    CPF VARCHAR(50),
    email VARCHAR(200) NOT NULL,
    senha TEXT,
    confirmacao INT DEFAULT 0,
    trocaSenha INT DEFAULT 0,
    codEmail INT,
    dataCriacao DATETIME,
	FOREIGN KEY (codPlano) REFERENCES planos(codPlano)
);

-- Criar tabela planos
CREATE TABLE planos
(
	codPlano INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    plano VARCHAR(200) NOT NULL,
    desconto DECIMAL(18,2),
    descricao TEXT,
    dataCriacao DATETIME
);

-- Criar tabela funcionarios
CREATE TABLE funcionarios
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    idade INT,
    CPF VARCHAR(50),
    email VARCHAR(200),
    senha TEXT,
    confirmacao INT DEFAULT 0,
    trocaSenha INT DEFAULT 0,
    codEmail INT,
    dataCriacao DATETIME
);