import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsultationComponent } from './dialog-consultation.component';

describe('DialogConsultationComponent', () => {
  let component: DialogConsultationComponent;
  let fixture: ComponentFixture<DialogConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
