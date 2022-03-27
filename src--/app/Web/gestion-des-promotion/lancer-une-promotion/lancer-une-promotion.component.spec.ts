import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancerUnePromotionComponent } from './lancer-une-promotion.component';

describe('LancerUnePromotionComponent', () => {
  let component: LancerUnePromotionComponent;
  let fixture: ComponentFixture<LancerUnePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancerUnePromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancerUnePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
