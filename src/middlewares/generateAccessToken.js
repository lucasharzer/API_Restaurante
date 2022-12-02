const jwt = require("jsonwebtoken");


// Gerar um token de acesso
function generateAccessToken(user){
    return jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: 10800// segundos
        }
    );
}

module.exports = generateAccessToken;