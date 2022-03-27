import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancerRetoursComponent } from './lancer-retours.component';

describe('LancerRetoursComponent', () => {
  let component: LancerRetoursComponent;
  let fixture: ComponentFixture<LancerRetoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancerRetoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancerRetoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
