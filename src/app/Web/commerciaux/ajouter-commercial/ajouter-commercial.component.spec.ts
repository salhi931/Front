import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCommercialComponent } from './ajouter-commercial.component';

describe('AjouterCommercialComponent', () => {
  let component: AjouterCommercialComponent;
  let fixture: ComponentFixture<AjouterCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterCommercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
