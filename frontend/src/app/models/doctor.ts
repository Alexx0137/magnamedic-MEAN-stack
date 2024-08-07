export class Doctor {
    constructor(
        public _id: string = "",
        public _documentTypeId: number = 0,
        public _identification: string = "",
        public _name: string = "",
        public _lastName: string = "",
        public _birthDate: Date,
        public _genderId: number = 0,
        public _address: string = "",
        public _telephone: string = "",
        public _email: string = "",
        public _speciality_id: string = "",
        public _professional_card: string = "",
        public state: boolean

    ) { }
}
