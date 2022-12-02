const nodemailer = require('nodemailer');

const SMTP_CONFIG = require('../config/smtp');


// Função para enviar email
async function enviarEmail(email, valor, tipo) {

    const transporter = nodemailer.createTransport({
        host: SMTP_CONFIG.host,
        port: SMTP_CONFIG.port,
        secure: false,
        auth: {
            user: SMTP_CONFIG.user,
            pass: SMTP_CONFIG.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailSent = await transporter.sendMail({
        text: `Olá,\nSeja bem-vindo ao sistema do Restaurante, segue o seu código de validação:\n\n${valor}\n\nAtenciosamente,\n\nEquipe API.`,
        subject: `Restaurante: Código de Validação de ${tipo}`,
        from: SMTP_CONFIG.user,
        to: email
    });

    console.log(mailSent);
}

module.exports = enviarEmail;