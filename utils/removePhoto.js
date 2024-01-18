const fs = require('fs');
const path = require('path');

module.exports = (directory, filename) => {
    const fileFullPath = path.resolve('public', directory, filename);
    const isExist = fs.existsSync(fileFullPath);
    return isExist ? fs.unlinkSync(fileFullPath) : null;
}