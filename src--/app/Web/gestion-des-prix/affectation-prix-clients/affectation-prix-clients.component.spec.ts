import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationPrixClientsComponent } from './affectation-prix-clients.component';

describe('AffectationPrixClientsComponent', () => {
  let component: AffectationPrixClientsComponent;
  let fixture: ComponentFixture<AffectationPrixClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationPrixClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationPrixClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
