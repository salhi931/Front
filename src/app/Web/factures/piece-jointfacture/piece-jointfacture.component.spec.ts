import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceJOintfactureComponent } from './piece-jointfacture.component';

describe('PieceJOintfactureComponent', () => {
  let component: PieceJOintfactureComponent;
  let fixture: ComponentFixture<PieceJOintfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieceJOintfactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceJOintfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
