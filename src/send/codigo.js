// Gerar um número aleatório de 4 dígitos
function gerarCodigo() {
    // (Math.random() * (máximo - mínimo)) + mínimo

    const numero = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    return numero;
}

module.exports = gerarCodigo;
