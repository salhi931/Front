import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancerUnPaiementComponent } from './lancer-un-paiement.component';

describe('LancerUnPaiementComponent', () => {
  let component: LancerUnPaiementComponent;
  let fixture: ComponentFixture<LancerUnPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancerUnPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancerUnPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
