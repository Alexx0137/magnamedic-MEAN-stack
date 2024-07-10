import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Speciality} from '../../../models/speciality'

interface SpecialityResponse {
    status: 'success' | 'error';
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class SpecialityService {
    readonly URL_API = 'http://localhost:3000/api/specialities';


    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * Obtener especialidad médica.
     *
     * @return {Observable<any>}
     * @author Nelson García
     */
    getSpecialities():Observable<any> {
        return this.http.get(this.URL_API);
    }


    /**
     * Obtener especialidad médica.
     *
     * @return {Observable<any>}
     *
     * @author Nelson García
     * @param _id
     */
    showSpeciality(_id: number):Observable<any> {
        return this.http.get(this.URL_API + `/${_id}`);
    }

    /**
     * Guardar especialidad médica.
     *
     * @return {Observable<any>}
     *
     * @author Nelson García
     * @param speciality
     */
    createSpeciality(speciality: Speciality): Observable<SpecialityResponse> {
        return this.http.post<SpecialityResponse>(this.URL_API, speciality);
    }


    /**
     * Actualizar especialidad médica.
     *
     * @return {Observable<any>}
     * @author Nelson García
     * @param speciality
     * @param _id
     */
    updateSpeciality(speciality: any, _id: any): Observable<SpecialityResponse> { // Añadir tipo 'any' a 'speciality' y '_id'
        return this.http.put<SpecialityResponse>(`${this.URL_API}/${_id}`, speciality);
    }

    /**
     * Eliminar especialidad médica.
     *
     * @return {Observable<any>}     *
     * @author Nelson García
     * @param _id
     */
    deleteSpeciality(_id: string): Observable<SpecialityResponse> {
        return this.http.delete<SpecialityResponse>(this.URL_API + `/${_id}`);
    }
}
