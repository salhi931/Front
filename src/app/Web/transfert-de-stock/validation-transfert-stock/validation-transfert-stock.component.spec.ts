import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationTransfertStockComponent } from './validation-transfert-stock.component';

describe('ValidationTransfertStockComponent', () => {
  let component: ValidationTransfertStockComponent;
  let fixture: ComponentFixture<ValidationTransfertStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationTransfertStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationTransfertStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
