const express = require('express');
const router = express.Router();
const medicalAppointmentCtrl = require('../controllers/speciality.controller');

router.get( '/', medicalAppointmentCtrl.getSpecialities);
router.post('/', medicalAppointmentCtrl.createSpeciality);
router.get('/:id', medicalAppointmentCtrl.getSpeciality);
router.put('/:id', medicalAppointmentCtrl.updateSpeciality);
router.delete('/:id', medicalAppointmentCtrl.deleteSpeciality);

module.exports = router;
