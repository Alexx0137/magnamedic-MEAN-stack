const Doctor = require('../models/doctor');
const doctorCtrl = {};


/**
 * Obtener todos los médicos.
 * @route GET /api/doctors
 * @returns {Array} Lista de médicos.
 * @author Nelson García
 */
doctorCtrl.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los médicos: ' + error.message
        });
    }
}

/**
 * Crear un nuevo médico.
 * @route POST /api/doctors
 * @param {Object} req.body - Datos del nuevo médico.
 * @returns {Object} Mensaje de éxito.
 * @author Nelson García
 */
doctorCtrl.createDoctor = async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json({
            status: 'success',
            message: 'Médico creado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el médico: ' + error.message
        });
    }
};

/**
 * Obtener un único médico por ID.
 * @route GET /api/doctors/:id
 * @param {String} req.params.id - ID del médico.
 * @returns {Object} Datos del médico.
 * @author Nelson García
 */
doctorCtrl.getDoctor = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id || id === 'null') { // Check for invalid ID
            return res.status(400).json({error: 'Invalid doctor ID'});
        }
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({error: 'Doctor not found'});
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({error: 'Error fetching doctor'});
    }
};

/**
 * Actualizar un médico existente.
 * @route PUT /api/doctors/:id
 * @param {String} req.params.id - ID del médico.
 * @param {Object} req.body - Datos actualizados del médico.
 * @returns {Object} Mensaje de éxito y datos del médico actualizado.
 * @author Nelson García
 */
doctorCtrl.updateDoctor = async (req, res) => {
    const {id} = req.params;

    try {
        if (!id || id === 'null') {
            return res.status(400).json({ error: 'Invalid doctor ID' });
        }
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        Object.assign(doctor, req.body);
        const updatedDoctor = await doctor.save();

        res.json({
            status: 'success',
            message: 'Médico actualizado exitosamente',
            doctor: updatedDoctor
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el médico: ' + error.message
        });
    }
};

/**
 * Eliminar un médico por ID.
 * @route DELETE /api/doctors/:id
 * @param {String} req.params.id - ID del médico.
 * @returns {Object} Mensaje de éxito.
 * @author Nelson García
 */
doctorCtrl.deleteDoctor = async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
            message: 'Médico eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el médico: ' + error.message
        });
    }
};

module.exports = doctorCtrl;
