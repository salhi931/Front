import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaiementComponent } from './dialog-paiement.component';

describe('DialogPaiementComponent', () => {
  let component: DialogPaiementComponent;
  let fixture: ComponentFixture<DialogPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
