// routes.js

const express = require('express');
const router = express.Router();
const userController = require('./controller/userController');
const orderController = require('./controller/orderController');
const personelController = require('./controller/personelController');
const peralatanController = require('./controller/peralatanController');
const dailyController = require('./controller/dailyController');
const indeksController = require('./controller/indexController');
const inpeksiController = require('./controller/inspeksiController');
const pemakaianController = require('./controller/pemakaianController');
const authenticateToken = require('./controller/authMiddleware');

// user
router.post('/users/create', userController.createUser);
// order
router.post('/order/create',authenticateToken, orderController.createOrder);
router.get('/order/getall',authenticateToken, orderController.getAllOrders);
// personel
router.post('/personel/add/:no_order',authenticateToken, personelController.addPersonelByNoOrder);
router.post('/personel/absen/:no_order',authenticateToken, personelController.absenPersonel);
router.get('/personel/absen/getall/:no_order/:tanggal',authenticateToken, personelController.getAbsenByNoOrder);
router.get('/personel/absen/name/:no_order/:name',authenticateToken, personelController.getAbsenByName);
router.put('/personel/update/:no_order/:name',authenticateToken, personelController.updatePersonelByName);
router.delete('/personel/delete/:no_order/:name',authenticateToken, personelController.deletePersonelByName);
router.get('/personel/getall/:no_order',authenticateToken, personelController.getPersonelByNoOrder);
// peralatan
router.post('/peralatan/add/:no_order',authenticateToken, peralatanController.addPeralatan);
router.get('/peralatan/getall/:no_order',authenticateToken, peralatanController.getAllPeralatan);
router.get('/peralatan/getall/:no_order/:tanggal',authenticateToken, peralatanController.getPeralatanDate);
// daily
router.post('/daily/add/:no_order',authenticateToken, dailyController.addDaily);
router.get('/daily/getall/:no_order',authenticateToken, dailyController.getAllDaily);
router.get('/daily/getall/:no_order/:tanggal',authenticateToken, dailyController.getAllDailyDate);
// indeks
router.post('/indeks/add/:no_order',authenticateToken, indeksController.addIndeks);
router.get('/indeks/getall/:no_order',authenticateToken, indeksController.getAllIndeks);
router.get('/indeks/getall/:no_order/:tanggal',authenticateToken, indeksController.getAllIndeksDate);
// inspeksi
router.post('/inspeksi/add/:no_order',authenticateToken, inpeksiController.addInspeksi);
router.get('/inspeksi/getall/:no_order',authenticateToken, inpeksiController.getAllInspeksi);
// pemakaian
router.post('/pemakaian/add/:no_order',authenticateToken, pemakaianController.addPemakaian);
router.get('/pemakaian/getall/:no_order',authenticateToken, pemakaianController.getAllPemakaian);
router.get('/pemakaian/getall/:no_order/:tanggal',authenticateToken, pemakaianController.getAllPemakaianDate);
// auth
router.post('/login', userController.loginUser);

module.exports = router;