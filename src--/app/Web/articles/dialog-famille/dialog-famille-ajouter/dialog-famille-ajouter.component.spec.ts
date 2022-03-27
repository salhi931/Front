import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFamilleAjouterComponent } from './dialog-famille-ajouter.component';

describe('DialogFamilleAjouterComponent', () => {
  let component: DialogFamilleAjouterComponent;
  let fixture: ComponentFixture<DialogFamilleAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFamilleAjouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFamilleAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
