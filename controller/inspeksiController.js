const { Order, InspeksiAksesHama } = require("../models");
const { uploadFile } = require("./dailyController");

exports.addInspeksi = async (req, res) => {
  try {
    uploadFile(req, res, async (err) => {
      if (err) {
        console.error("Gagal mengunggah file:", err);
        return res.status(500).json({ error: "Gagal mengunggah file" });
      }
      const { no_order } = req.params;
      const {
        name,
        lokasi,
        rekomendasi,
        tanggal,
      
        keterangan,
      } = req.body;

      const { filename } = req.file; // Nama file yang diunggah

      // Cari nomor order yang sesuai
      const existingOrder = await Order.findOne({ where: { no_order } });

      if (!existingOrder) {
        return res.status(404).json({ error: "Nomor order tidak ditemukan" });
      }

      // Tambahkan data Daily ke dalam tabel
      const newDaily = await InspeksiAksesHama.create({
        name,
        lokasi,
        rekomendasi,
        tanggal,
        bukti_foto: filename,
        keterangan,
        no_order,
      });

      res.status(201).json(newDaily);
    });
  } catch (error) {
    console.error("Gagal menambahkan Inspeksi:", error);
    res.status(500).json({ error: "Gagal menambahkan Inspeksi" });
  }
 
};

exports.getAllInspeksi = async (req, res) => {
  try {
    const { no_order } = req.params;

    // Cari semua data Inspeksi berdasarkan nomor order
    const InspeksiList = await InspeksiAksesHama.findAll({
      where: { no_order },
    });

    if (!InspeksiList || InspeksiList.length === 0) {
      return res
        .status(404)
        .json({ error: "Tidak ada data Inspeksi untuk nomor order ini" });
    }

    res.status(200).json(InspeksiList);
  } catch (error) {
    console.error("Gagal mendapatkan data Inspeksi:", error);
    res.status(500).json({ error: "Gagal mendapatkan data Inspeksi" });
  }
};
