const crypto = require("crypto");
module.exports = function(mingma) {
    let md5 = crypto.createHash('md5');
    let password = md5.update(mingma).digest('base64');
    return password;
}