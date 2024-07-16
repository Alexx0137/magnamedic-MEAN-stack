const mongoose = require('mongoose');

const {Schema} = mongoose;

const AppointmentSchema = new Schema({

    patient_id: {type: String, require: true},
    speciality_id: {type: String, require: true},
    doctor_id: {type: String, require: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    state: {type: Number, required: true},
    observations: {type: String, require: true},
});

module.exports = mongoose.model('Appointment', AppointmentSchema)