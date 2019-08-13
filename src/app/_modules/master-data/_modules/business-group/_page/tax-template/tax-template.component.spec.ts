import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTemplateComponent } from './tax-template.component';

describe('TaxTemplateComponent', () => {
  let component: TaxTemplateComponent;
  let fixture: ComponentFixture<TaxTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
