const mongoose = require('mongoose');

const {Schema} = mongoose;

const PatientSchema = new Schema({

    identification_type_id: {type:Number, require:true},
    identification: {type:String, require:true},
    name: {type:String, require:true},
    last_name: {type:String, require:true},
    eps: {type:String, require:true},
    blood_type_id: {type:Number, require:true},
    gender_id: {type:Number, require:true},
    birth_date: {type:Date, require:true},
    age: {type:Number, require:true},
    address: {type:String, require:true},
    telephone: {type:String, require:true},
    email: {type:String, require:true},
    state: {type:String, require:true},
});

module.exports = mongoose.model('Patient', PatientSchema)