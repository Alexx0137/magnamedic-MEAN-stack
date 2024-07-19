const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const patientCtrl = require("../controllers/patient.controller");

router.get( '/', userCtrl.getUsers);
router.post('/', userCtrl.createUser);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

router.get('/exist/:identification', userCtrl.verificationUser);


module.exports = router;