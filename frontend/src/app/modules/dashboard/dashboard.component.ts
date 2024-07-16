import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {DashboardService} from "./services/dashboard.service";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    totalAppointments: number = 0;
    attendedAppointments: number = 0;
    pendingAppointments: number = 0;
    cancelledAppointments: number = 0;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit(): void {
        // this.loadStats();
    }

    loadStats(): void {
        this.dashboardService.getAppointmentStats().subscribe((data: any) => {
            this.totalAppointments = data.totalAppointments;
            this.attendedAppointments = data.attendedAppointments;
            this.pendingAppointments = data.pendingAppointments;
            this.cancelledAppointments = data.cancelledAppointments;
        });
    }
}
