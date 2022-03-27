import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionCommerciauxComponent } from './edition-commerciaux.component';

describe('EditionCommerciauxComponent', () => {
  let component: EditionCommerciauxComponent;
  let fixture: ComponentFixture<EditionCommerciauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionCommerciauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionCommerciauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
