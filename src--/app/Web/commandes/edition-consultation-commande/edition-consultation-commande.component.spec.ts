import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionConsultationCommandeComponent } from './edition-consultation-commande.component';

describe('EditionConsultationCommandeComponent', () => {
  let component: EditionConsultationCommandeComponent;
  let fixture: ComponentFixture<EditionConsultationCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionConsultationCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionConsultationCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
