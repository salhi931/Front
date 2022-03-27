import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimisationDesVisitesComponent } from './optimisation-des-visites.component';

describe('OptimisationDesVisitesComponent', () => {
  let component: OptimisationDesVisitesComponent;
  let fixture: ComponentFixture<OptimisationDesVisitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptimisationDesVisitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimisationDesVisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
