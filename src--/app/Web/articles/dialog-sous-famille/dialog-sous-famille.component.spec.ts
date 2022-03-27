import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSousFamilleComponent } from './dialog-sous-famille.component';

describe('DialogSousFamilleComponent', () => {
  let component: DialogSousFamilleComponent;
  let fixture: ComponentFixture<DialogSousFamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSousFamilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSousFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
