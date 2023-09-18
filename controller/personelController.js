const { Personel, Order,Absensi } = require('../models');

exports.addPersonelByNoOrder = async (req, res) => {
  try {
    const { no_order } = req.params; // Mengambil "no_order" dari URL parameter
    const { name } = req.body;

    // Cari order berdasarkan no_order
    const order = await Order.findOne({ where: { no_order } });

    if (!order) {
      return res.status(404).json({ error: 'Order tidak ditemukan' });
    }

    // Buat data personel dan hubungkan dengan order
    const newPersonel = await Personel.create({ name,no_order });
    

    res.status(201).json(newPersonel);
  } catch (error) {
    console.error('Gagal menambahkan personel:', error);
    res.status(500).json({ error: 'Gagal menambahkan personel' });
  }
};


exports.getPersonelByNoOrder = async (req, res) => {
  try {
    const { no_order } = req.params; 

  
    const order = await Order.findOne({ where: { no_order } });

    if (!order) {
      return res.status(404).json({ error: 'Order tidak ditemukan' });
    }

  
    const personelList = await Personel.findAll({ where: { no_order: no_order } });

    res.status(200).json(personelList);
  } catch (error) {
    console.error('Gagal mendapatkan daftar personel:', error);
    res.status(500).json({ error: 'Gagal mendapatkan daftar personel' });
  }
};

exports.getAbsenByNoOrder = async (req, res) => {
  try {
    const { no_order,tanggal } = req.params; 

  
    const order = await Absensi.findOne({ where: { no_order } });

    if (!order) {
      return res.status(404).json({ error: 'Order tidak ditemukan' });
    }

  
    const personelList = await Absensi.findAll({ where: { no_order: no_order,tanggal:tanggal } });

    res.status(200).json(personelList);
  } catch (error) {
    console.error('Gagal mendapatkan daftar personel:', error);
    res.status(500).json({ error: 'Gagal mendapatkan daftar personel' });
  }
};

exports.getAbsenByName = async (req, res) => {
  try {
    const { no_order,name } = req.params; 

  
    const order = await Absensi.findOne({ where: { no_order } });

    if (!order) {
      return res.status(404).json({ error: 'Order tidak ditemukan' });
    }

  
    const personelList = await Absensi.findAll({ where: { no_order: no_order,name:name } });

    res.status(200).json(personelList);
  } catch (error) {
    console.error('Gagal mendapatkan daftar personel:', error);
    res.status(500).json({ error: 'Gagal mendapatkan daftar personel' });
  }
};

exports.absenPersonel = async (req, res) => {
  try {
    const { no_order } = req.params; 
    const { keterangan, name, tanggal } = req.body;

    const order = await Order.findOne({ where: { no_order } });

    if (!order) {
      return res.status(404).json({ error: 'Order tidak ditemukan' });
    }

   

    const result = await Absensi.create({ name, no_order, tanggal, keterangan });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Gagal absen' });
  }
};


exports.updatePersonelByName = async (req, res) => {
  try {
    const { name } = req.params; 
    const { newData } = req.body; 

   
    const personel = await Personel.findOne({ where: { name: name } });

    if (!personel) {
      return res.status(404).json({ error: 'Personel tidak ditemukan' });
    }

    // Lakukan update data personel
    await personel.update(newData);

    res.status(200).json({ message: 'Data personel berhasil diupdate' });
  } catch (error) {
    console.error('Gagal mengupdate personel:', error);
    res.status(500).json({ error: 'Gagal mengupdate personel' });
  }
};
exports.deletePersonelByName = async (req, res) => {
  try {
    const { name } = req.params; // Mengambil "name" dari URL parameter

    // Cari personel berdasarkan personel_name
    const personel = await Personel.findOne({ where: { name: name } });

    if (!personel) {
      return res.status(404).json({ error: 'Personel tidak ditemukan' });
    }

    // Hapus data personel
    await personel.destroy();

    res.status(200).json({ message: 'Data personel berhasil dihapus' });
  } catch (error) {
    console.error('Gagal menghapus personel:', error);
    res.status(500).json({ error: 'Gagal menghapus personel' });
  }
};