import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancerUneCommandeComponent } from './lancer-une-commande.component';

describe('LancerUneCommandeComponent', () => {
  let component: LancerUneCommandeComponent;
  let fixture: ComponentFixture<LancerUneCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancerUneCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancerUneCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
