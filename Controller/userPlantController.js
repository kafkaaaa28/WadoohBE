const Plant = require('../model/Plant');
const UserPlant = require('../model/UserPlant');

const userPlantController = {
  plantNow: async (req, res) => {
    try {
      const { user_id, plant_id } = req.body;

      const plant = await Plant.getById(plant_id);
      if (!plant) return res.status(404).json({ message: 'Tanaman tidak ditemukan' });

      const now = new Date();
      const harvest_at = new Date(now);
      harvest_at.setDate(now.getDate() + plant.harvest_duration);

      const newUserPlant = await UserPlant.create({
        user_id,
        plant_id,
        planted_at: now,
        harvest_at,
      });

      res.status(201).json({ ...newUserPlant, message: 'Tanaman berhasil ditanam' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getUserPlants: async (req, res) => {
    try {
      const { user_id } = req.params;
      const userPlants = await UserPlant.getByUserId(user_id);
      res.json(userPlants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userPlantController;
