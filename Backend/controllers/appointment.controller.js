const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const appointmentCtrl = {};


/**
 * Obtener todas las citas médicas ordenadas por fecha ascendente.
 * @route GET /api/appointments
 * @returns {Array} Lista de citas médicas ordenadas por fecha ascendente.
 * @author Nelson García
 */
appointmentCtrl.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
};


/**
 * Crear una nueva cita médica.
 * @route POST /api/appointments
 * @param {Object} req.body - Datos de la nueva cita médica.
 * @returns {Object} Mensaje de éxito.
 * @author Nelson García
 */
appointmentCtrl.createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json({
            status: 'success',
            message: 'Cita médica creada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear la cita médica: ' + error.message
        });
    }
};


/**
 * Obtener una única cita médica por ID.
 * @route GET /api/appointments/:id
 * @param {String} req.params.id - ID de la cita médica.
 * @returns {Object} Datos de la cita médica.
 * @author Nelson García
 */
appointmentCtrl.getAppointment = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id || id === 'null') { // Check for invalid ID
            return res.status(400).json({error: 'Invalid appointment ID'});
        }
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({error: 'Appointment not found'});
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({error: 'Error fetching appointment'});
    }
};

/**
 * Actualizar una cita médica existente.
 * @route PUT /api/appointments/:id
 * @param {String} req.params.id - ID del usuario.
 * @param {Object} req.body - Datos actualizados de la cita médica.
 * @returns {Object} Mensaje de éxito y datos de la cita médica actualizado.
 * @author Nelson García
 */
appointmentCtrl.updateAppointment = async (req, res) => {
    const {id} = req.params;

    try {
        if (!id || id === 'null') {
            return res.status(400).json({ error: 'Invalid appointment ID' });
        }
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        Object.assign(appointment, req.body);
        const updatedAppointment = await appointment.save();

        res.json({
            status: 'success',
            message: 'Cita médica actualizada exitosamente',
            appointment: updatedAppointment
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar la cita médica: ' + error.message
        });
    }
};


/**
 * Eliminar una cita médica por ID.
 * @route DELETE /api/appointments/:id
 * @param {String} req.params.id - ID de la cita médica
 * @returns {Object} Mensaje de éxito.
 * @author Nelson García
 */
appointmentCtrl.deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
            message: 'Cita médica eliminada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar la cita médica: ' + error.message
        });
    }
};


module.exports = appointmentCtrl;
