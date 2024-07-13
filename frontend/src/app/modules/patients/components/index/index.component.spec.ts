import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexComponent } from './index.component';
import { NgForOf, NgIf } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PatientService } from '../../services/patient.service';
import {ToastrModule} from "ngx-toastr";
import {of} from "rxjs";

describe('IndexComponent', () => {
    let component: IndexComponent;
    let fixture: ComponentFixture<IndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                IndexComponent,
                NgForOf,
                NgIf,
                RouterLink,
                HttpClientTestingModule,
                ToastrModule.forRoot(),
            ],
            providers: [PatientService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: 1 }) // Proporcionar un valor simulado para los parámetros
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(IndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debe existir el IndexComponent', () => {
        expect(component).toBeTruthy();
    });
});
