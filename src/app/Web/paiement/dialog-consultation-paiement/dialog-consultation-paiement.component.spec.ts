import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsultationPaiementComponent } from './dialog-consultation-paiement.component';

describe('DialogConsultationPaiementComponent', () => {
  let component: DialogConsultationPaiementComponent;
  let fixture: ComponentFixture<DialogConsultationPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConsultationPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConsultationPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
