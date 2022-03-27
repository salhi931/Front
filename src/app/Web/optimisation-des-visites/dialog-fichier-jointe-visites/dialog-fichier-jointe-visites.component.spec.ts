import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFichierJointeVisitesComponent } from './dialog-fichier-jointe-visites.component';

describe('DialogFichierJointeVisitesComponent', () => {
  let component: DialogFichierJointeVisitesComponent;
  let fixture: ComponentFixture<DialogFichierJointeVisitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFichierJointeVisitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFichierJointeVisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
