import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRetourComponent } from './dialog-retour.component';

describe('DialogRetourComponent', () => {
  let component: DialogRetourComponent;
  let fixture: ComponentFixture<DialogRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRetourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
