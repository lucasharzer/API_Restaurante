require("dotenv").config();
const jwt = require("jsonwebtoken");


// Validação para o token
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).send({
            id: 0,
            mensagem: 'Token não foi informado!'
        });
    }
    
    const parts = authHeader.split(" ");

    if (!parts.length === 2){
        return res.status(401).send({
            id: 0,
            mensagem: "Erro ao gerar o token."
        });
    }

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)){
        return res.status(401).send({
            id: 0,
            mensagem: "Token mal formado."
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(498).send({
            id: 0,
            mensagem: "Você não está logado."
        });

        req.usuarioId = decoded.id;
        return next();
    });
};

// Para requisitar as rotas:
// router.use(authMiddleware);