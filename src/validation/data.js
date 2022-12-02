// Pegar a data atual
function Data(){

    var data = new Date();

    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    var hora = data.getHours();
    var min = data.getMinutes();
    var seg = data.getSeconds(); 

    var str_data = ano + '-' + (mes+1) + '-' + dia;
    var str_hora = hora + ':' + min + ':' + seg;

    var data_atual = `${str_data} ${str_hora}`
    return data_atual
}

module.exports = Data;