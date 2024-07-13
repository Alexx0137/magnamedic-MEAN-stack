import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {HttpClientModule} from "@angular/common/http";

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormComponent ,
                HttpClientModule,// Asegúrate de importarlo aquí
            ],
            providers: [
                PatientService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({ get: () => '1' }) // Simulación del ID
                    }
                },
                {
                    provide: ToastrService,
                    useValue: {
                        success: jasmine.createSpy('success'),
                        error: jasmine.createSpy('error'),
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Debe existir el FormComponent', () => {
        expect(component).toBeTruthy();
    });
});
