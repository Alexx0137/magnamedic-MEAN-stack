import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from 'ngx-toastr';
import {DatePipe, NgIf} from "@angular/common";

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
        NgIf
    ],
    providers: [DatePipe],
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent {

}
