import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Doctor} from '../../../models/doctor'

interface DoctorResponse {
    status: 'success' | 'error';
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    readonly URL_API = 'http://localhost:3000/api/doctors';


    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * Obtener doctores.
     *
     * @return {Observable<any>}
     * @author Nelson García
     */
    getDoctors():Observable<any> {
        return this.http.get(this.URL_API);
    }


    /**
     * Obtener doctor.
     *
     * @param {number} id id del doctor.
     * @return {Observable<any>}
     *
     * @author Nelson García
     */
    showDoctor(_id: number):Observable<any> {
        return this.http.get(this.URL_API + `/${_id}`);
    }

    /**
     * Guardar doctor.
     *
     * @return {Observable<any>}
     *
     * @author Nelson García
     * @param doctor
     */
    createDoctor(doctor: Doctor): Observable<DoctorResponse> {
        return this.http.post<DoctorResponse>(this.URL_API, doctor);
    }


    /**
     * Actualizar doctor.
     *
     * @return {Observable<any>}
     * @author Nelson García
     * @param doctor
     * @param _id
     */
    updateDoctor(doctor: any, _id: any): Observable<DoctorResponse> { // Añadir tipo 'any' a 'doctor' y '_id'
        return this.http.put<DoctorResponse>(`${this.URL_API}/${_id}`, doctor);
    }

    /**
     * Eliminar doctor.
     *
     * @return {Observable<any>}     *
     * @author Nelson García
     * @param _id
     */
    deleteDoctor(_id: string): Observable<DoctorResponse> {
        return this.http.delete<DoctorResponse>(this.URL_API + `/${_id}`);
    }
}
