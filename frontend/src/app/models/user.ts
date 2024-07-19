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
        public state: number
    ) {
    }
}
