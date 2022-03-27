import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFactureComponent } from './dialog-facture.component';

describe('DialogFactureComponent', () => {
  let component: DialogFactureComponent;
  let fixture: ComponentFixture<DialogFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
