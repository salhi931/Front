import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationModificationUnePromotionComponent } from './consultation-modification-une-promotion.component';

describe('ConsultationModificationUnePromotionComponent', () => {
  let component: ConsultationModificationUnePromotionComponent;
  let fixture: ComponentFixture<ConsultationModificationUnePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationModificationUnePromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationModificationUnePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
