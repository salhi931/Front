import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationPaiementComponent } from './consultation-paiement.component';

describe('ConsultationPaiementComponent', () => {
  let component: ConsultationPaiementComponent;
  let fixture: ComponentFixture<ConsultationPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
