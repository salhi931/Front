import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFamilleComponent } from './dialog-famille.component';

describe('DialogFamilleComponent', () => {
  let component: DialogFamilleComponent;
  let fixture: ComponentFixture<DialogFamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFamilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
