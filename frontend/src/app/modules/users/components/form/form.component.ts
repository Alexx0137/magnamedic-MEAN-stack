import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
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
export class FormComponent implements OnInit {

    userForm!: FormGroup;
    public id: any = null;
    isEditMode = false;
    isActive= false ;

    constructor(
        private userService: UserService,
        private router: Router,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.initForm();

        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.isEditMode = !!this.id;

            if (this.isEditMode) {
                this.getUser();
            }
        });
    }

    initForm(): void {
        this.userForm = this.formBuilder.group({
            name: ['', Validators.required],
            last_name: ['', Validators.required],
            identification_type_id: ['', Validators.required],
            identification: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            role: ['', [Validators.required]],
            state: [true, [Validators.required]],
        });
    }

    createUser(data: any): void {
        this.userService.createUser(data)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigate(['/dashboard/users/list']);
                },
                error: () => {
                    this.toastr.error('Hubo un error al crear el paciente', 'Error');
                }
            });
    }

    submit() {
        const formData = this.userForm.value;

        if (this.isEditMode) {
            this.updateUser(formData);
        } else {
            this.createUser(formData);
        }
    }

    getUser() {
        this.userService.showUser(this.id)
            .subscribe(response => {
                console.log("usuario", response);
                response.state = response.state === 'true';
                this.userForm.patchValue(response);
            });
    }


    updateUser(form_value: any) {
        form_value._method = 'PUT';

        this.userService.updateUser(form_value, this.id)
            .subscribe({
                next: (response) => {
                    this.toastr.success(response.message, 'Muy bien');
                    void this.router.navigateByUrl('/dashboard/users/list');
                },
                error: () => {
                    this.toastr.error('Hubo un error al actualizar el paciente', 'Error');
                }
            });
    }
}
