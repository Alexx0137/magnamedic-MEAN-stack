export class User {
    constructor(
        public _id: string,
        public documentTypeId: number = 0,
        public identification: string,
        public name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public role: string,
        public state: boolean
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
