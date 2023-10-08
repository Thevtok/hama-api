
const { Order, MonitoringPeralatan} = require('../models');
exports.addPeralatan = async (req, res) => {
  try {
    const { name, merek, jumlah, satuan, kondisi, tanggal } = req.body;
    const { no_order } = req.params;

    // Cari nomor order yang sesuai
    const existingOrder = await Order.findOne({ where: { no_order } });

    if (!existingOrder) {
      return res.status(404).json({ error: 'Nomor order tidak ditemukan' });
    }

    // Periksa apakah data peralatan dengan nama yang sama sudah ada di dalam order
    const existingPeralatan = await MonitoringPeralatan.findOne({
      where: { no_order, name },
    });

    if (existingPeralatan) {
      return res.status(409).json({ error: 'Data peralatan sudah ada' });
    }

    // Tambahkan data peralatan ke dalam tabel
    const newPeralatan = await MonitoringPeralatan.create({
      name,
      no_order,
      merek,
      jumlah,
      satuan,
      kondisi,
      tanggal,
    });

    res.status(201).json(newPeralatan);
  } catch (error) {
    console.error('Gagal menambahkan peralatan:', error);
    res.status(500).json({ error: 'Gagal menambahkan peralatan' });
  }
};

  exports.getPeralatanDate = async (req, res) => {
    try {
      const { no_order,tanggal } = req.params;
  
      // Cari semua data peralatan berdasarkan nomor order
      const peralatanList = await MonitoringPeralatan.findAll({ where: { no_order, tanggal } });
  
      if (!peralatanList || peralatanList.length === 0) {
        return res.status(404).json({ error: 'Tidak ada data peralatan untuk nomor order ini' });
      }
  
      res.status(200).json(peralatanList);
    } catch (error) {
      console.error('Gagal mendapatkan data peralatan:', error);
      res.status(500).json({ error: 'Gagal mendapatkan data peralatan' });
    }
  };
  
  exports.getAllPeralatan = async (req, res) => {
    try {
      const { no_order } = req.params;
  
      // Cari semua data peralatan berdasarkan nomor order
      const peralatanList = await MonitoringPeralatan.findAll({ where: { no_order } });
  
      if (!peralatanList || peralatanList.length === 0) {
        return res.status(404).json({ error: 'Tidak ada data peralatan untuk nomor order ini' });
      }
  
      res.status(200).json(peralatanList);
    } catch (error) {
      console.error('Gagal mendapatkan data peralatan:', error);
      res.status(500).json({ error: 'Gagal mendapatkan data peralatan' });
    }
  };
  