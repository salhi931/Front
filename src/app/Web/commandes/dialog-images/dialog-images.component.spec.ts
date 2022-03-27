import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImagesComponent } from './dialog-images.component';

describe('DialogImagesComponent', () => {
  let component: DialogImagesComponent;
  let fixture: ComponentFixture<DialogImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
