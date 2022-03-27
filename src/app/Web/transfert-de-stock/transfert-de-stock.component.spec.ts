import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertDeStockComponent } from './transfert-de-stock.component';

describe('TransfertDeStockComponent', () => {
  let component: TransfertDeStockComponent;
  let fixture: ComponentFixture<TransfertDeStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertDeStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertDeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
