import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistoriqueComponent } from './dialog-historique.component';

describe('DialogHistoriqueComponent', () => {
  let component: DialogHistoriqueComponent;
  let fixture: ComponentFixture<DialogHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
