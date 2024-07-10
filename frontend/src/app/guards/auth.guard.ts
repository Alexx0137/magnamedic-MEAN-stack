// // src/app/guards/auth.guard.ts
// import { Injectable } from '@angular/core';
// import { CanActivate, Router, UrlTree } from '@angular/router';
// import {AuthService} from "../modules/auth/services/auth.service";
//
// @Injectable({
//     providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//
//     constructor(private authService: AuthService, private router: Router) {}
//
//     canActivate(): UrlTree | boolean {
//         if (this.authService.isAuthenticated()) {
//             return true; // User is authenticated, allow access
//         } else {
//             return this.router.parseUrl('/login'); // User is not authenticated, redirect to login
//         }
//     }
// }
