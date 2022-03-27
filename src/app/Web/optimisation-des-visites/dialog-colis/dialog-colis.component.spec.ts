import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogColisComponent } from './dialog-colis.component';

describe('DialogColisComponent', () => {
  let component: DialogColisComponent;
  let fixture: ComponentFixture<DialogColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogColisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
