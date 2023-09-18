
const { Order, DailyActivity} = require('../models');
const multer = require('multer');
const path = require('path');



// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Simpan file di direktori "uploads/"
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const filename = `${Date.now()}${extname}`;
    cb(null, filename);
  },
});

// Inisialisasi multer dengan konfigurasi penyimpanan
const upload = multer({ storage });

// Middleware untuk menangani unggahan file
exports.uploadFile = upload.single('bukti_foto'); // 'bukti_foto' sesuaikan dengan nama field form

exports.addDaily = async (req, res) => {
  try {
    uploadFile(req, res, async (err) => {
      if (err) {
        console.error('Gagal mengunggah file:', err);
        return res.status(500).json({ error: 'Gagal mengunggah file' });
      }
      const { no_order } = req.params;
      const {
        name,
        lokasi,
        jenis_treatment,
        hama_ditemukan,
        jumlah,
        tanggal,
        keterangan,
       
      } = req.body;

      const { filename } = req.file; // Nama file yang diunggah

      // Cari nomor order yang sesuai
      const existingOrder = await Order.findOne({ where: { no_order } });

      if (!existingOrder) {
        return res.status(404).json({ error: 'Nomor order tidak ditemukan' });
      }

      // Tambahkan data Daily ke dalam tabel
      const newDaily = await DailyActivity.create({
        name,
        lokasi,
        jenis_treatment,
        hama_ditemukan,
        jumlah,
        tanggal,
        bukti_foto: filename, // Simpan nama file dalam tabel
        keterangan,
        no_order,
      });

      res.status(201).json(newDaily);
    });
  } catch (error) {
    console.error('Gagal menambahkan Daily:', error);
    res.status(500).json({ error: 'Gagal menambahkan Daily' });
  }
};
  
  exports.getAllDaily = async (req, res) => {
    try {
      const { no_order } = req.params;
  
      // Cari semua data Daily berdasarkan nomor order
      const DailyList = await DailyActivity.findAll({ where: { no_order } });
  
      if (!DailyList || DailyList.length === 0) {
        return res.status(404).json({ error: 'Tidak ada data Daily untuk nomor order ini' });
      }
  
      res.status(200).json(DailyList);
    } catch (error) {
      console.error('Gagal mendapatkan data Daily:', error);
      res.status(500).json({ error: 'Gagal mendapatkan data Daily' });
    }
  };
  
  exports.getAllDailyDate = async (req, res) => {
    try {
      const { no_order,tanggal } = req.params;
  
      // Cari semua data Daily berdasarkan nomor order
      const DailyList = await DailyActivity.findAll({ where: { no_order,tanggal } });
  
      if (!DailyList || DailyList.length === 0) {
        return res.status(404).json({ error: 'Tidak ada data Daily untuk nomor order ini' });
      }
  
      res.status(200).json(DailyList);
    } catch (error) {
      console.error('Gagal mendapatkan data Daily:', error);
      res.status(500).json({ error: 'Gagal mendapatkan data Daily' });
    }
  };
  



