import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesPrixComponent } from './gestion-des-prix.component';

describe('GestionDesPrixComponent', () => {
  let component: GestionDesPrixComponent;
  let fixture: ComponentFixture<GestionDesPrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDesPrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDesPrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
