import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesColisComponent } from './gestion-des-colis.component';

describe('GestionDesColisComponent', () => {
  let component: GestionDesColisComponent;
  let fixture: ComponentFixture<GestionDesColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDesColisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDesColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
