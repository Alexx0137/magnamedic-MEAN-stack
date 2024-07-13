import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../models/user'

export interface UserResponse {
    status: 'success' | 'error';
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly URL_API = 'http://localhost:3000/api/users';


    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * Obtener usuarios.
     *
     * @return {Observable<any>}
     * @author Nelson García
     */
    getUsers():Observable<any> {
        return this.http.get(this.URL_API);
    }


    /**
     * Obtener usuario.
     *
     * @return {Observable<any>}
     *
     * @author Nelson García
     * @param _id
     */
    showUser(_id: number):Observable<any> {
        return this.http.get(this.URL_API + `/${_id}`);
    }

    /**
     * Guardar usuario.
     *
     * @return {Observable<any>}
     *
     * @author Nelson García
     * @param user
     */
    createUser(user: User): Observable<UserResponse> {
        return this.http.post<UserResponse>(this.URL_API, user);
    }


    /**
     * Actualizar usuario.
     *
     * @return {Observable<any>}
     * @author Nelson García
     * @param user
     * @param _id
     */
    updateUser(user: any, _id: any): Observable<UserResponse> { // Añadir tipo 'any' a 'user' y '_id'
        return this.http.put<UserResponse>(`${this.URL_API}/${_id}`, user);
    }

    /**
     * Eliminar usuario.
     *
     * @return {Observable<any>}     *
     * @author Nelson García
     * @param _id
     */
    deleteUser(_id: string): Observable<UserResponse> {
        return this.http.delete<UserResponse>(this.URL_API + `/${_id}`);
    }
}
