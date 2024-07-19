const mongoose = require('mongoose');

const {Schema} = mongoose;

const SpecialitySchema = new Schema({

    code: {type:Number, require:true},
    name: {type:String, require:true},
    consulting_room: {type:String, require:true},
});

module.exports = mongoose.model('Speciality', SpecialitySchema)