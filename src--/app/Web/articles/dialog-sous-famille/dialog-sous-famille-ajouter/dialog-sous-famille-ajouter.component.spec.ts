import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSousFamilleAjouterComponent } from './dialog-sous-famille-ajouter.component';

describe('DialogSousFamilleAjouterComponent', () => {
  let component: DialogSousFamilleAjouterComponent;
  let fixture: ComponentFixture<DialogSousFamilleAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSousFamilleAjouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSousFamilleAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
