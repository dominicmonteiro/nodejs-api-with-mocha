// models/vehicle.js
const fs = require('fs').promises;
const path = require('path');
const fileService = require('../services/fileService');

const filePath = path.join(__dirname, '../..', 'data', 'vehicles.json');

// Garante que o arquivo existe (caso não, cria um array vazio)
async function ensureFile() {
    try {
        await fs.access(filePath);
    } catch {
        await fs.writeFile(filePath, JSON.stringify([]));
    }
}

module.exports = {
    async create(vehicle) {
        await ensureFile();
        const vehicles = await fileService.read(filePath);
        // Gerando um ID único (pode ser melhorado para UUID ou similar)
        vehicle.id = vehicles.length ? vehicles[vehicles.length - 1].id + 1 : 1;
        vehicles.push(vehicle);
        await fileService.write(filePath, vehicles);
        return vehicle;
    },

    async getAll() {
        await ensureFile();
        return fileService.read(filePath);
    },

    async getById(id) {
        await ensureFile();
        const vehicles = await fileService.read(filePath);
        return vehicles.find(v => v.id === parseInt(id));
    },

    async update(id, updatedData) {
        await ensureFile();
        const vehicles = await fileService.read(filePath);
        const index = vehicles.findIndex(v => v.id === parseInt(id));
        if (index === -1) return null;
        vehicles[index] = { ...vehicles[index], ...updatedData, id: parseInt(id) };
        await fileService.write(filePath, vehicles);
        return vehicles[index];
    },

    async delete(id) {
        await ensureFile();
        const vehicles = await fileService.read(filePath);
        const index = vehicles.findIndex(v => v.id === parseInt(id));
        if (index === -1) return null;
        vehicles.splice(index, 1);
        await fileService.write(filePath, vehicles);
        return true;
    }
};
