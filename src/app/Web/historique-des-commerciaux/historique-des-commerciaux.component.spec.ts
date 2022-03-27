import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueDesCommerciauxComponent } from './historique-des-commerciaux.component';

describe('HistoriqueDesCommerciauxComponent', () => {
  let component: HistoriqueDesCommerciauxComponent;
  let fixture: ComponentFixture<HistoriqueDesCommerciauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueDesCommerciauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueDesCommerciauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
