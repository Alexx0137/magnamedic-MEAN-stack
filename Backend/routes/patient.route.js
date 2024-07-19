const express = require('express');
const router = express.Router();
const patientCtrl = require('../controllers/patient.controller');

router.get( '/', patientCtrl.getPatients);
router.post('/', patientCtrl.createPatient);
router.get('/:id', patientCtrl.getPatient);
router.put('/:id', patientCtrl.editarPatient);
router.delete('/:id', patientCtrl.eliminarPatient);

router.get('/exist/:identification', patientCtrl.verificationPatient);

module.exports = router;
