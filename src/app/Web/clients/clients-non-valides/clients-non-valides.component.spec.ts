import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsNonValidesComponent } from './clients-non-valides.component';

describe('ClientsNonValidesComponent', () => {
  let component: ClientsNonValidesComponent;
  let fixture: ComponentFixture<ClientsNonValidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsNonValidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsNonValidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
