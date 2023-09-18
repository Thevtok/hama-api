const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar' });
    }

    // Jika email belum terdaftar, maka buat pengguna baru
    const newUser = await User.create({ email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Gagal membuat pengguna:', error);
    res.status(500).json({ error: 'Gagal membuat pengguna' });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    // Jika email dan password cocok, buat token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, 'secret_key', {
      expiresIn: '1h', // Durasi token berlaku
    });

    // Kirim token sebagai respons
    res.json({ token });
  } catch (error) {
    console.error('Gagal login:', error);
    res.status(500).json({ error: 'Gagal login' });
  }
};