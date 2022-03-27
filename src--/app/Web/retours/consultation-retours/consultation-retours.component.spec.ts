import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationRetoursComponent } from './consultation-retours.component';

describe('ConsultationRetoursComponent', () => {
  let component: ConsultationRetoursComponent;
  let fixture: ComponentFixture<ConsultationRetoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationRetoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationRetoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
