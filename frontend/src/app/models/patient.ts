export class Patient {
    constructor(
        public _id: string = "",
        public documentTypeId: number = 0,
        public identification: string = "",
        public name: string = "",
        public last_name: string = "",
        public birthDate: Date,
        public genderId: number = 0,
        public address: string = "",
        public telephone: string = "",
        public email: string = ""
    ) { }
}
