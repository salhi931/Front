import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmeDeSelectionComponent } from './algorithme-de-selection.component';

describe('AlgorithmeDeSelectionComponent', () => {
  let component: AlgorithmeDeSelectionComponent;
  let fixture: ComponentFixture<AlgorithmeDeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmeDeSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmeDeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
