const express = require('express');
const router = express.Router();
const appointmentCtrl = require('../controllers/appointment.controller');

router.get( '/', appointmentCtrl.getAppointments);
router.post('/', appointmentCtrl.createAppointment);
router.get('/:id', appointmentCtrl.getAppointment);
router.put('/:id', appointmentCtrl.updateAppointment);
router.delete('/:id', appointmentCtrl.deleteAppointment);

router.get('/patient/:patientId', appointmentCtrl.getAppointmentsByPatient);

module.exports = router;
