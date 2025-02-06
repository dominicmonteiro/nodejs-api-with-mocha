// services/fileService.js
const fs = require('fs').promises;

module.exports = {
    async read(filePath) {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    },

    async write(filePath, data) {
        return fs.writeFile(filePath, JSON.stringify(data, null, 2));
    }
};
