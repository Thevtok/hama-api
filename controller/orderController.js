const { Order } = require('../models');

exports.createOrder = async (req, res) => {
    try {
      const { no_order } = req.body;
  
     
  
     
      const newOrder = await Order.create({ no_order });
      res.status(201).json(newOrder);
    } catch (error) {
     
      res.status(500).json({ error: 'Gagal membuat order' });
    }
  };

  exports.getAllOrders = async (req, res) => {
    try {
      // Ambil semua order dari database
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (error) {
      console.error('Gagal mengambil order:', error);
      res.status(500).json({ error: 'Gagal mengambil order' });
    }
  };