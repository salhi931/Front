import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationManuelleComponent } from './affectation-manuelle.component';

describe('AffectationManuelleComponent', () => {
  let component: AffectationManuelleComponent;
  let fixture: ComponentFixture<AffectationManuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationManuelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationManuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
