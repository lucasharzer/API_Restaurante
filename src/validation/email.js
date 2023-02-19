// Validar um email
function validarEmail(e) {
    if (typeof(e) !== 'string') {
        return false
    } else {
        if (e.indexOf('@') == -1 || e.indexOf('.') == -1) {
            return false
        } else {
            if (e.indexOf(" ") !== -1) {
                return false
            } else {
                if (e.length == 0) {
                    return false
                } else {
                    return true
                }
            }
        }
    }
}

module.exports = validarEmail;