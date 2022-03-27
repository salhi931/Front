import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogArticleComponent } from './dialog-article.component';

describe('DialogArticleComponent', () => {
  let component: DialogArticleComponent;
  let fixture: ComponentFixture<DialogArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
