import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
    private URL_API = 'http://localhost:3000/api/reports';

    constructor(private http: HttpClient) {}

    getReports(): Observable<any> {
        return this.http.get<any>(this.URL_API);
    }
}
