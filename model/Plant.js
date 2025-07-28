const db = require('../config/db.js');

class Plant {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM plants');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM plants WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ name, category, harvest_duration, description }) {
    const [result] = await db.query(`INSERT INTO plants (name, category, harvest_duration, description) VALUES (?, ?, ?, ?)`, [name, category, harvest_duration, description]);
    return { id: result.insertId, name, category, harvest_duration, description };
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM plants WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Plant;
