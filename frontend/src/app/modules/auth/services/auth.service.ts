import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private URL_API = 'http://localhost:3000/api/auth';
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient,
                private router: Router) {}

    login(credentials: { email: string, password: string }) {
        return this.http.post<any>(`${this.URL_API}/login`, credentials).pipe(
            tap(response => {
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    this.loggedIn.next(true);
                    this.router.navigate(['/dashboard']);
                }
            })
        );
    }

    isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    logout() {
        localStorage.removeItem('token');
        this.loggedIn.next(false);
        this.router.navigate(['/auth/login']);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getAuthUser(): any {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(<string>localStorage.getItem('user'));
            return JSON.parse(atob(user.user));
        }
        return null;
    }

    setAuthUser(user: any): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    isAuthenticated() {
        return false;
    }
}
