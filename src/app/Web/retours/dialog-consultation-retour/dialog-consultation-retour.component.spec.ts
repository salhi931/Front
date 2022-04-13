import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsultationRetourComponent } from './dialog-consultation-retour.component';

describe('DialogConsultationRetourComponent', () => {
  let component: DialogConsultationRetourComponent;
  let fixture: ComponentFixture<DialogConsultationRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConsultationRetourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConsultationRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
