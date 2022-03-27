import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesPromotionComponent } from './gestion-des-promotion.component';

describe('GestionDesPromotionComponent', () => {
  let component: GestionDesPromotionComponent;
  let fixture: ComponentFixture<GestionDesPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDesPromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDesPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
