# API Restaurante

API com Node.js e com banco de dados MySQL de um sistema de restaurante com funcionalidades para funcionários, clientes, planos para os clientes, cardápio e pedidos dos clientes. Além disso, há envio automático de e-mail, criptografia de senhas, Bearer token de acesso para autenticação, possui todos os métodos de API (GET, POST, PUT e DELETE), documentação no Swagger e passar a aplicação para o Docker.

# Pacotes

- bcrypt: Criptografia e descriptografia de senhas;
- body-parser: Análise de corpo de requisições HTTP;
- dotenv: Carrega as variáveis de ambiente do arquivo .env;
- express: Cria uma estrutura de aplicativo da web com vários recursos;
- jsonwebtoken: Criar autenticação e troca de informações;
- jwt-decode: Decodifica token de acesso;
- mysql2: Cria conexão e executa comandos em banco de dados MySQL;
- nodemon: Reinicia automaticamente a API ao notar alterações;
- nodemailer: Enviar e-mails com o node.js;
- swagger-autogen: Cria a documentação web da API com o Swagger por meio de identificação automática de todos os métodos usados;
- swagger-ui-express: Permite a criação de documentação da API.

# Comandos

Verificar a versão do node.js
```bash
node --version
```

Verificar a versão do npm
```bash
npm --version
```

Criar o JSON dos pacotes
```bash
npm init
```

Instalar algum pacote
```bash
npm i pacote
```

Criar o JSON do Swagger
```bash
npm run swagger-autogen
```

Colocar a API em execução
```bash
npm start
```

Verificar a versão do Docker
```bash
docker --version
```

Dockerizar e executar a API dentro dele
```bash
docker compose up
```

# Resultados

cmd:
<span>
    <img src="https://user-images.githubusercontent.com/85804895/205183705-dbb33c2d-ee08-4241-a1e8-33d9aec008af.png">
</span>

banco de dados MySQL:
<span>
    <img src="https://user-images.githubusercontent.com/85804895/205183960-b92feb8b-aa6f-4c10-9839-d70980520330.png">
</span>

Postman:
<span>
    <img src="https://user-images.githubusercontent.com/85804895/205184076-c2a0e125-10aa-4e4d-ba04-10539bf3a017.png">
</span>

<span>
    <img src="https://user-images.githubusercontent.com/85804895/205184158-bef7cbc1-11bd-4943-9116-1e791e15bff5.png">
</span>

Swagger:
<span>
    <img src="https://user-images.githubusercontent.com/85804895/205184213-73fe6a7d-90a0-465e-970d-6d6ad408340d.png">
</span>

<span>
    <img src="https://user-images.githubusercontent.com/85804895/205184306-8d0b5cc2-9872-412e-8267-9ceed3b4e6e6.png">
</span>

Docker:
<span>
    <img src="https://user-images.githubusercontent.com/85804895/222026303-ae46c799-8a7e-4238-a5bc-1022bde94611.png">
</span>

<span>
    <img src="https://user-images.githubusercontent.com/85804895/222026397-e41a5e27-a933-430c-a84b-69a7e327ea9f.png">
</span>