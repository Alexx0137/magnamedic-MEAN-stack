import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Appointment} from '../../../models/appointment'

interface AppointmentResponse {
    status: 'success' | 'error';
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    readonly URL_API = 'http://localhost:3000/api/appointments';


    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * Obtener citas médicas.
     *
     * @return {Observable<any>}
     * @author Nelson García
     */
    getAppointments():Observable<any> {
        return this.http.get(this.URL_API);
    }


    /**
     * Obtener cita médica.
     *
     * @param {number} id id de la cita médica.
     * @return {Observable<any>}
     *
     * @author Nelson García
     */
    showAppointment(_id: number):Observable<any> {
        return this.http.get(this.URL_API + `/${_id}`);
    }

    /**
     * Guardar cita médica.
     *
     * @return {Observable<any>}
     *
     * @author Nelson García
     * @param appointment
     */
    createAppointment(appointment: Appointment): Observable<AppointmentResponse> {
        return this.http.post<AppointmentResponse>(this.URL_API, appointment);
    }


    /**
     * Actualizar cita médica.
     *
     * @return {Observable<any>}
     * @author Nelson García
     * @param appointment
     * @param _id
     */
    updateAppointment(appointment: any, _id: any): Observable<AppointmentResponse> { // Añadir tipo 'any' a 'appointment' y '_id'
        return this.http.put<AppointmentResponse>(`${this.URL_API}/${_id}`, appointment);
    }

    /**
     * Eliminar cita médica.
     *
     * @return {Observable<any>}     *
     * @author Nelson García
     * @param _id
     */
    deleteAppointment(_id: string): Observable<AppointmentResponse> {
        return this.http.delete<AppointmentResponse>(this.URL_API + `/${_id}`);
    }
}
