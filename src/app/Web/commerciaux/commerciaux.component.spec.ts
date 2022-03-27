import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerciauxComponent } from './commerciaux.component';

describe('CommerciauxComponent', () => {
  let component: CommerciauxComponent;
  let fixture: ComponentFixture<CommerciauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommerciauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerciauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
