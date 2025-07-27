const jwt = require('jsonwebtoken');
const User = require('../model/User.js');
const bcrypt = require('bcryptjs');
const authController = {
  register: async (req, res) => {
    try {
      const { nama, email, password } = req.body;

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Pengguna sudah ada' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        nama,
        email,
        password: hashedPassword,
        role: 'petani',
      });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      console.error('Gagal Registrasi:', err);

      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'email atau password salah' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'email atau password salah' });
      }
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          ...(user.role === 'dokter' && { poli: user.poli }),
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.error({ message: err.message });
    }
  },

  getMe: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      const user = await User.findByEmail(req.user.email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const responseUser = {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      };

      res.json(responseUser);
    } catch (err) {
      console.error('❌ Error getMe:', err.message);
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = authController;
