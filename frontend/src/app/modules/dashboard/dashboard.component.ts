import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ReportsService} from "../reports/services/reports.service";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        NgForOf
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    totalAppointments: number = 0;
    totalAttended: number = 0;
    totalPending: number = 0;
    totalCanceled: number = 0;

    attendedPercentage: number = 0;
    canceledPercentage: number = 0;
    pendingPercentage: number = 0;

    constructor(
        private reportService: ReportsService) {
    }

    ngOnInit(): void {
        this.loadReports();
    }

    /**
     * Carga los datos de los reportes desde el servicio.
     */
    loadReports(): void {
        this.reportService.getReports().subscribe(data => {
            this.totalAppointments = data.totalAppointments;
            this.totalAttended = data.medicalAppointments.reduce((sum: number, item: any) => sum + item.attended, 0);
            this.totalCanceled = data.medicalAppointments.reduce((sum: number, item: any) => sum + item.cancelled, 0);
            this.totalPending = this.totalAppointments - this.totalAttended - this.totalCanceled;

            this.calculatePercentages();
        });
    }

    /**
     * Calcula los porcentajes de citas atendidas, canceladas y pendientes.
     */
    calculatePercentages(): void {
        this.attendedPercentage = this.totalAppointments ? (this.totalAttended / this.totalAppointments) * 100 : 0;
        this.canceledPercentage = this.totalAppointments ? (this.totalCanceled / this.totalAppointments) * 100 : 0;
        this.pendingPercentage = this.totalAppointments ? (this.totalPending / this.totalAppointments) * 100 : 0;
    }
}
