const User = require('../model/User.js');
const bcrypt = require('bcryptjs');
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getuserbyid: async (req, res) => {
    try {
      const { id } = req.params;
      const usersid = await User.getuserByid(id);
      res.json(usersid);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, email, role } = req.body;
      const updatedUser = await User.update(id, {
        nama,
        email,
        role,
      });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.delete(id);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  createpetani: async (req, res) => {
    try {
      const { nama, email } = req.body;

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Pengguna sudah ada' });
      }
      console.log('PASSWORD_PETANI:', process.env.PASSWORD_PETANI);
      const hashedPassword = await bcrypt.hash(process.env.PASSWORD_PETANI, 10);

      const user = await User.create({
        nama,
        email,
        password: hashedPassword,
        role: 'petani',
      });

      res.status(201).json({
        message: 'Petani berhasil ditambahkan',
        user: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userController;
