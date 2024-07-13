import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../../../models/patient'

export interface PatientResponse {
    status: 'success' | 'error';
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    readonly URL_API = 'http://localhost:3000/api/patients';


    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * Obtener pacientes.
     *
     * @return {Observable<any>}
     * @author Nelson García
     */
    getPatients():Observable<any> {
        return this.http.get(this.URL_API);
    }


    /**
     * Obtener paciente.
     *
     * @param {number} id id del paciente.
     * @return {Observable<any>}
     *
     * @author Nelson García
     */
    showPatient(_id: number):Observable<any> {
        return this.http.get(this.URL_API + `/${_id}`);
    }

    /**
     * Guardar paciente.
     *
     * @return {Observable<any>}
     *
     * @author Nelson García
     * @param patient
     */
    createPatient(patient: Patient): Observable<PatientResponse> {
        return this.http.post<PatientResponse>(this.URL_API, patient);
    }


    /**
     * Actualizar paciente.
     *
     * @return {Observable<any>}
     * @author Nelson García
     * @param patient
     * @param _id
     */
    updatePatient(patient: any, _id: any): Observable<PatientResponse> { // Añadir tipo 'any' a 'patient' y '_id'
        return this.http.put<PatientResponse>(`${this.URL_API}/${_id}`, patient);
    }

    /**
     * Eliminar paciente.
     *
     * @return {Observable<any>}     *
     * @author Nelson García
     * @param _id
     */
    deletePatient(_id: string): Observable<PatientResponse> {
        return this.http.delete<PatientResponse>(this.URL_API + `/${_id}`);
    }
}
