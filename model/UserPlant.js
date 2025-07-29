const db = require('../config/db');

class UserPlant {
  static async create({ user_id, plant_id, planted_at, harvest_at }) {
    const [result] = await db.query(`INSERT INTO user_plants (user_id, plant_id, planted_at, harvest_at) VALUES (?, ?, ?, ?)`, [user_id, plant_id, planted_at, harvest_at]);
    return { id: result.insertId, user_id, plant_id, planted_at, harvest_at };
  }

  static async getByUserId(user_id) {
    const [rows] = await db.query(
      `SELECT up.*, p.name AS plant_name, p.category, p.harvest_duration 
       FROM user_plants up 
       JOIN plants p ON p.id = up.plant_id
       WHERE user_id = ?`,
      [user_id]
    );
    return rows;
  }
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM user_plants');
    return rows;
  }
}

module.exports = UserPlant;
