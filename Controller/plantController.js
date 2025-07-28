const Plant = require('../model/Plant.js');

const plantController = {
  getAllPlants: async (req, res) => {
    try {
      const plants = await Plant.getAll();
      res.json(plants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createPlant: async (req, res) => {
    try {
      const plant = await Plant.create(req.body);
      res.status(201).json(plant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = plantController;
