import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerciauxReportingComponent } from './commerciaux-reporting.component';

describe('CommerciauxReportingComponent', () => {
  let component: CommerciauxReportingComponent;
  let fixture: ComponentFixture<CommerciauxReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommerciauxReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerciauxReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
