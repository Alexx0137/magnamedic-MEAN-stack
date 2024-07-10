export class Appointment {
    constructor(
        public _id: string = "",
        public _identification: string = "",
        public _identification_type_id: string = "",
        public _name: string = "",
        public _last_name: string = "",
        public _speciality_id: String = "",
        public _doctor_id: String = "",
        public _date: Date,
        public _time: String = "",
        public _observations: string = ""
    ) { }
}
