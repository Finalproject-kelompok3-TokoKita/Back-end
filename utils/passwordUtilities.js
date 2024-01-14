const bcrypt = require('bcrypt');

const hash = async (plainPassword) => {
    return await bcrypt.hash(plainPassword, 10);
}

const compare = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
    hash,
    compare
}