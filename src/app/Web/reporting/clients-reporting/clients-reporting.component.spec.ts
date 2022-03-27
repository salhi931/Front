import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsReportingComponent } from './clients-reporting.component';

describe('ClientsReportingComponent', () => {
  let component: ClientsReportingComponent;
  let fixture: ComponentFixture<ClientsReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
