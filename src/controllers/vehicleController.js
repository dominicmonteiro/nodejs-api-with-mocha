// controllers/vehicleController.js
const Vehicle = require('../models/vehicle');

exports.createVehicle = async (req, res) => {
    try {
        const newVehicle = await Vehicle.create(req.body);
        res.status(201).json(newVehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.getAll();
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.getById(req.params.id);
        if (!vehicle) return res.status(404).json({ error: 'Veículo não encontrado' });
        res.json(vehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateVehicle = async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.update(req.params.id, req.body);
        if (!updatedVehicle) return res.status(404).json({ error: 'Veículo não encontrado' });
        res.json(updatedVehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteVehicle = async (req, res) => {
    try {
        const deleted = await Vehicle.delete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Veículo não encontrado' });
        res.json({ message: 'Veículo removido com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
