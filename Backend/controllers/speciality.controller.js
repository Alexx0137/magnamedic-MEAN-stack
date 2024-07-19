const Speciality = require('../models/speciality');
const Patient = require("../models/patient");
const specialityCtrl = {};


/**
 * Obtener todas las especialidades médicas.
 * @route GET /api/specialities
 * @returns {Array} Lista de las especialidades médicas.
 * @author Nelson García
 */
specialityCtrl.getSpecialities = async (req, res) => {
    try {
        const specialities = await Speciality.find();
        res.json(specialities);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las especialidades médicas: ' + error.message
        });
    }
}

/**
 * Crear una nueva especialidad médica.
 * @route POST /api/specialities
 * @param {Object} req.body - Datos de la nueva especialidad médica.
 * @returns {Object} Mensaje de éxito.
 * @author Nelson García
 */
specialityCtrl.createSpeciality = async (req, res) => {
    try {
        const speciality = new Speciality(req.body);
        await speciality.save();
        res.status(201).json({
            status: 'success',
            message: 'Especialidad médica creada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear la especialidad médica: ' + error.message
        });
    }
};

/**
 * Obtener una única especialidad médica por ID.
 * @route GET /api/specialities/:id
 * @param {String} req.params.id - ID de la especialidad médica.
 * @returns {Object} Datos de la especialidad médica.
 * @author Nelson García
 */
specialityCtrl.getSpeciality = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id || id === 'null') {
            return res.status(400).json({error: 'Invalid speciality ID'});
        }
        const speciality = await Speciality.findById(id);
        if (!speciality) {
            return res.status(404).json({error: 'Speciality not found'});
        }
        res.json(speciality);
    } catch (error) {
        res.status(500).json({error: 'Error fetching speciality'});
    }
};

/**
 * Actualizar una especialidad médica.
 * @route PUT /api/specialities/:id
 * @param {String} req.params.id - ID de la especialidad médica.
 * @param {Object} req.body - Datos actualizados de la especialidad médica.
 * @returns {Object} Mensaje de éxito y datos de la especialidad médica actualizado.
 * @author Nelson García
 */
specialityCtrl.updateSpeciality = async (req, res) => {
    const {id} = req.params;

    try {
        if (!id || id === 'null') {
            return res.status(400).json({error: 'Invalid speciality ID'});
        }
        const speciality = await Speciality.findById(id);
        if (!speciality) {
            return res.status(404).json({error: 'Speciality not found'});
        }
        Object.assign(speciality, req.body);
        const updatedSpeciality = await speciality.save();

        res.json({
            status: 'success',
            message: 'Especialidad médica actualizada exitosamente',
            speciality: updatedSpeciality
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar la especialidad médica: ' + error.message
        });
    }
};

/**
 * Eliminar una especialidad médica por ID.
 * @route DELETE /api/specialities/:id
 * @param {String} req.params.id - ID de la especialidad médica.
 * @returns {Object} Mensaje de éxito.
 * @author Nelson García
 */
specialityCtrl.deleteSpeciality = async (req, res) => {
    try {
        await Speciality.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
            message: 'Especialidad médica eliminada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar la especialidad médica: ' + error.message
        });
    }
};

specialityCtrl.verificationSpeciality = async (req, res) => {
    const { code } = req.params;
    const speciality = await Speciality.findOne({ code });
    res.send(!!speciality)
}


module.exports = specialityCtrl;
