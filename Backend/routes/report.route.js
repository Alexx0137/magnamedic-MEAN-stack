const express = require('express');
const router = express.Router();
const reportCtrl = require('../controllers/report.controller');

router.get( '/', reportCtrl.getReports);



module.exports = router;