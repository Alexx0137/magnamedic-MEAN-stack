import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    readonly URL_API = 'http://localhost:3000/api/appointments';


    constructor(
        private http: HttpClient
    ) { }


    getAppointmentStats(): Observable<any> {
        return this.http.get(this.URL_API + `/stats`);
    }
}
