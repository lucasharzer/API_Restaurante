// Validar um CPF
function Validar(c) {
    const cpf_numero = c.replace('.', '').replace('.', '').replace('-', '').trim();
    let novePrimeiros = cpf_numero.substr(0, 9)
    let dezPrimeiros = cpf_numero.substr(0, 10)
    let somaNovePrimeiros = 0
    let somaDezPrimeiros = 0
    let multiplicador = 10;

    for (let i = 0; i < novePrimeiros.length; i++) {
        let numero = novePrimeiros.substr(i, 1);
        somaNovePrimeiros += numero * multiplicador;
        multiplicador--;
    };

    multiplicador = 11;

    for (let i = 0; i < dezPrimeiros.length; i++) {
        let numero = dezPrimeiros.substr(i, 1);
        somaDezPrimeiros += numero * multiplicador;
        multiplicador--;
    }

    let resultado1 = (somaNovePrimeiros * 10) % 11;
    let resultado2 = (somaDezPrimeiros * 10) % 11;

    if ((resultado1.toString() + resultado2.toString()) === cpf_numero.substr(9, 2)) {
        return cpf_numero
    }else {
        return false
    }
}

module.exports = Validar;