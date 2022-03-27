import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesReportingComponent } from './articles-reporting.component';

describe('ArticlesReportingComponent', () => {
  let component: ArticlesReportingComponent;
  let fixture: ComponentFixture<ArticlesReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
