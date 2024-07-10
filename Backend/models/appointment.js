const mongoose = require('mongoose');

const {Schema} = mongoose;

const AppointmentSchema = new Schema({

    identification: {type:Number, require:true},
    identification_type_id: {type:Number, require:true},
    name: {type:String, require:true},
    last_name: {type:String, require:true},
    speciality_id: {type:String, require:true},
    doctor_id: {type:String, require:true},
    date: { type: Date, required: true },
    time: { type: String, required: true },
    observations: {type:String, require:true},
});

module.exports = mongoose.model('Appointment', AppointmentSchema)