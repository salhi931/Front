import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionConsultationComponent } from './edition-consultation.component';

describe('EditionConsultationComponent', () => {
  let component: EditionConsultationComponent;
  let fixture: ComponentFixture<EditionConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
