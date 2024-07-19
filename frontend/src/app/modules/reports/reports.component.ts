import {Component, OnInit} from '@angular/core';
import {ReportsService} from "./services/reports.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-reports',
  standalone: true,
    imports: [
        NgIf,
        NgForOf,
        RouterLink
    ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
    public isLoading: boolean = false;
    public reportData: any;

    constructor(private reportsService: ReportsService) {}

    ngOnInit() {
        this.isLoading = true;
        this.loadReports();
    }

    loadReports() {
        this.reportsService.getReports().subscribe((data) => {
            this.reportData = data;
            this.isLoading = false;
        });
    }
}
