const express = require('express');
const router = express.Router();
const doctorCtrl = require('../controllers/doctor.controller');

router.get( '/', doctorCtrl.getDoctors);
router.post('/', doctorCtrl.createDoctor);
router.get('/:id', doctorCtrl.getDoctor);
router.put('/:id', doctorCtrl.updateDoctor);
router.delete('/:id', doctorCtrl.deleteDoctor);

module.exports = router;
