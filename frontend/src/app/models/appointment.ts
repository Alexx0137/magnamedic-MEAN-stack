export class Appointment {
    constructor(
        public _id: string = "",
        public _patient_id: string,
        public _speciality_id: String = "",
        public _doctor_id: String = "",
        public _date: Date,
        public _time: String = "",
        public _state: number = 1,
        public _observations: string = ""
    ) { }
}
