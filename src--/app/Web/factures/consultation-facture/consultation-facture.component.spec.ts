import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationFactureComponent } from './consultation-facture.component';

describe('ConsultationFactureComponent', () => {
  let component: ConsultationFactureComponent;
  let fixture: ComponentFixture<ConsultationFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
