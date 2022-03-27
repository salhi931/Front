import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPositionComponent } from './dialog-position.component';

describe('DialogPositionComponent', () => {
  let component: DialogPositionComponent;
  let fixture: ComponentFixture<DialogPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
