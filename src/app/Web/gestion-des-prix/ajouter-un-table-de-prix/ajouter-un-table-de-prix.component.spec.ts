import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterUnTableDePrixComponent } from './ajouter-un-table-de-prix.component';

describe('AjouterUnTableDePrixComponent', () => {
  let component: AjouterUnTableDePrixComponent;
  let fixture: ComponentFixture<AjouterUnTableDePrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterUnTableDePrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterUnTableDePrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
