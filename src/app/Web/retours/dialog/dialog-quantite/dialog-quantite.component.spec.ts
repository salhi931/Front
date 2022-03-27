import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQuantiteComponent } from './dialog-quantite.component';

describe('DialogQuantiteComponent', () => {
  let component: DialogQuantiteComponent;
  let fixture: ComponentFixture<DialogQuantiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQuantiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogQuantiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
