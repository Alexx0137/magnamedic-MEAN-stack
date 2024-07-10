export class User {
    constructor(
        public _id: String,
        public _documentTypeId: number = 0,
        public _identification: String,
        public _name: String,
        public _lastName: String,
        public _email: String,
        public _password: String,
        public role: String
    ) {
    }
}

// const { Schema, model } = require('mongoose');
//
// const userSchema = new Schema({
//     id: String,
//     documentTypeId: Number,
//     identification: String,
//     name: String,
//     lastName: String,
//     email: String,
//     password: String,
//     role: String
// });
// module.exports = model('User', userSchema, 'users');
