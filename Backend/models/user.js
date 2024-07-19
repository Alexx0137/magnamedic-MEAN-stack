const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({

    identification_type_id: {type:Number, require:true},
    identification: {type:Number, require:true},
    name: {type:String, require:true},
    last_name: {type:String, require:true},
    email: {type:String, require:true},
    password: {type:String, require:true},
    role: {type:String, require:true},
    state: {type:Number, require:true},
},{
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema)