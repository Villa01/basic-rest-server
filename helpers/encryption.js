
const bcryptjs = require('bcryptjs');

const encrypt = (word) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(word, salt);
}

module.exports = {
    encrypt
}