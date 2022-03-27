import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogArticleConsulteComponent } from './dialog-article-consulte.component';

describe('DialogArticleConsulteComponent', () => {
  let component: DialogArticleConsulteComponent;
  let fixture: ComponentFixture<DialogArticleConsulteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogArticleConsulteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogArticleConsulteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
