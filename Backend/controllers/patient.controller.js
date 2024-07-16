/**
 * Se coloca el controlador como un objeto y luego se exporta como
 * se requiere primero el modelo patient
 */

const Patient = require('../models/patient');
const patientCtrl = {};

/**
 * DEFINO LOS MÉTODOS  */

//Obtener todos los patients
patientCtrl.getPatients = async (req, res) => {
    const patients = await Patient.find();
    res.json(patients);
}

// Crear patients
patientCtrl.createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json({
            status: 'success',
            message: 'Paciente creado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el paciente: ' + error.message
        });
    }
};


// Conseguir un único patient
patientCtrl.getPatient = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id || id === 'null') { // Check for invalid ID
            return res.status(400).json({error: 'Invalid patient ID'});
        }
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({error: 'Patient not found'});
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({error: 'Error fetching patient'});
    }
};


//Actualizar patient
patientCtrl.editarPatient = async (req, res) => {
    const {id} = req.params;

    try {
        if (!id || id === 'null') {
            return res.status(400).json({ error: 'Invalid patient ID' });
        }
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        Object.assign(patient, req.body);
        const updatedPatient = await patient.save();

        res.json({
            status: 'success',
            message: 'Paciente actualizado exitosamente',
            patient: updatedPatient
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el paciente: ' + error.message
        });
    }
};


// Eliminar paciente
patientCtrl.eliminarPatient = async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
            message: 'Paciente eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el paciente: ' + error.message
        });
    }
};

patientCtrl.verificationPatient = async (req, res) => {
    const { identification } = req.params;
    const patient = await Patient.findOne({ identification });
    res.send(!!patient);
}

module.exports = patientCtrl;