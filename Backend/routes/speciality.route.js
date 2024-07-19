const express = require('express');
const router = express.Router();
const specialityCtrl = require('../controllers/speciality.controller');

router.get( '/', specialityCtrl.getSpecialities);
router.post('/', specialityCtrl.createSpeciality);
router.get('/:id', specialityCtrl.getSpeciality);
router.put('/:id', specialityCtrl.updateSpeciality);
router.delete('/:id', specialityCtrl.deleteSpeciality);

router.get('/exists/:code', specialityCtrl.verificationSpeciality);

module.exports = router;
