import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsultationCommandeComponent } from './dialog-consultation-commande.component';

describe('DialogConsultationCommandeComponent', () => {
  let component: DialogConsultationCommandeComponent;
  let fixture: ComponentFixture<DialogConsultationCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConsultationCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConsultationCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
