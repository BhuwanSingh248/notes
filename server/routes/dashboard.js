const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');

router.get('/dashboard', DashboardController.dashboard);


module.exports = router;