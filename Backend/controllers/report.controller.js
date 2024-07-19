const Appointment = require('../models/appointment');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const Speciality = require('../models/speciality');

const reportCtrl = {};


/**
 * Obtiene varios reportes incluyendo citas médicas, conteo de pacientes, conteo de doctores,
 * y envía una respuesta JSON.
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @returns {Object} Respuesta JSON con los datos de los reportes
 * @author Nelson García
 */
reportCtrl.getReports = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        const specialities = await Speciality.find();
        const doctors = await Doctor.find();
        const medicalAppointments = {};

        const doctorsBySpeciality = specialities.map(speciality => {
            const count = doctors.filter(doctor => doctor.speciality_id.toString() === speciality._id.toString()).length;
            return {
                speciality: speciality.name,
                totalDoctors: count
            };
        });

        appointments.forEach(appointment => {
            const specialityId = appointment.speciality_id.toString();
            const specialityName = specialities.find(s => s._id.toString() === specialityId)?.name || 'Desconocida';

            if (!medicalAppointments[specialityName]) {
                medicalAppointments[specialityName] = {
                    speciality: specialityName,
                    total: 0,
                    pending: 0,
                    attended: 0,
                    cancelled: 0
                };
            }

            medicalAppointments[specialityName].total++;

            if (appointment.state === 1) {
                medicalAppointments[specialityName].pending++;
            }

            if (appointment.state === 2) {
                medicalAppointments[specialityName].attended++;
            }

            if (appointment.state === 3) {
                medicalAppointments[specialityName].cancelled++;
            }
        });

        const medicalAppointmentsArray = Object.values(medicalAppointments);

        if (medicalAppointmentsArray.length === 0) {
            medicalAppointmentsArray.push({ speciality: 'No hay datos', total: 0, atendidas: 0, canceladas: 0 });
        }

        const totalAppointments = appointments.length;

        const totalPatients = await Patient.countDocuments();
        const activePatients = await Patient.countDocuments({ state: 'true' });
        const inactivePatients = await Patient.countDocuments({ state: 'false' });

        const totalDoctors = await Doctor.countDocuments();
        const activeDoctors = await Doctor.countDocuments({ state: 'true' });
        const inactiveDoctors = await Doctor.countDocuments({ state: 'false' });

        res.json({
            medicalAppointments: medicalAppointmentsArray,
            totalAppointments: totalAppointments,
            totalPatients: totalPatients,
            activePatients: activePatients,
            inactivePatients: inactivePatients,

            totalDoctors: totalDoctors,
            activeDoctors: activeDoctors,
            inactiveDoctors: inactiveDoctors,

            doctorsBySpeciality: doctorsBySpeciality
        });

    } catch (error) {
        console.error('Error al obtener reportes:', error);
        res.status(500).json({ message: 'Error al obtener reportes' });
    }
};

module.exports = reportCtrl;
