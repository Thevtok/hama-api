
const { Order, MonitoringPemakaian} = require('../models');

exports.addPemakaian = async (req, res) => {
    try {
      const {  name, bahan_aktif, merk, stok_awal, satuan,tanggal,out,ins,stok_akhir,satuanb } = req.body;
      const { no_order } = req.params;
      // Cari nomor order yang sesuai
      const existingOrder = await Order.findOne({ where: { no_order } });
  
      if (!existingOrder) {
        return res.status(404).json({ error: 'Nomor order tidak ditemukan' });
      }
  
      // Tambahkan data Pemakaian ke dalam tabel
      const newPemakaian = await MonitoringPemakaian.create({ name, bahan_aktif, merk, stok_awal, satuan,tanggal,ins,no_order,out,stok_akhir,satuanb });
  
      res.status(201).json(newPemakaian);
    } catch (error) {
      console.error('Gagal menambahkan Pemakaian:', error);
      res.status(500).json({ error: 'Gagal menambahkan Pemakaian' });
    }
  };
  
  exports.getAllPemakaian = async (req, res) => {
    try {
      const { no_order } = req.params;
  
      // Cari semua data Pemakaian berdasarkan nomor order
      const PemakaianList = await MonitoringPemakaian.findAll({ where: { no_order } });
  
      if (!PemakaianList || PemakaianList.length === 0) {
        return res.status(404).json({ error: 'Tidak ada data Pemakaian untuk nomor order ini' });
      }
  
      res.status(200).json(PemakaianList);
    } catch (error) {
      console.error('Gagal mendapatkan data Pemakaian:', error);
      res.status(500).json({ error: 'Gagal mendapatkan data Pemakaian' });
    }
  };
  