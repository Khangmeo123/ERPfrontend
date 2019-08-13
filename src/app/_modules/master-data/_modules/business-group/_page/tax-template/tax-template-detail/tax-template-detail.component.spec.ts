import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTemplateDetailComponent } from './tax-template-detail.component';

describe('TaxTemplateDetailComponent', () => {
  let component: TaxTemplateDetailComponent;
  let fixture: ComponentFixture<TaxTemplateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxTemplateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxTemplateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
