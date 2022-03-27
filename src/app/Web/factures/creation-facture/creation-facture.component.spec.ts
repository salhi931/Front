import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationFactureComponent } from './creation-facture.component';

describe('CreationFactureComponent', () => {
  let component: CreationFactureComponent;
  let fixture: ComponentFixture<CreationFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
