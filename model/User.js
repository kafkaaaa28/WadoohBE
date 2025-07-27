const db = require('../config/db.js');
class Users {
  static async create(userData) {
    const { nama, email, password, role } = userData;

    const [result] = await db.query(
      `INSERT INTO users 
        (nama,  email, password, role) 
        VALUES (?, ?, ?, ?)`,
      [nama, email, password, role]
    );

    return { id: result.insertId, ...userData };
  }

  static async createPetani(petani) {
    const { nama, email, password, role } = petani;

    const [result] = await db.query(
      `INSERT INTO users 
        (nama, , email, password, role) 
        VALUES (?, ?, ?, ?)`,
      [nama, email, password, role]
    );

    return { id: result.insertId, ...petani };
  }
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) return null;

    return rows[0];
  }

  static async getAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }
  static async getUserById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return rows[0];
  }

  static async update(id, Userdata) {
    const { nama, email, role } = Userdata;
    await db.query(
      `UPDATE users 
        SET nama = ?, email = ?, role = ?
        WHERE id = ?`,
      [nama, email, role, id]
    );
    return { id, ...Userdata };
  }

  static async delete(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return true;
  }
}
module.exports = Users;
