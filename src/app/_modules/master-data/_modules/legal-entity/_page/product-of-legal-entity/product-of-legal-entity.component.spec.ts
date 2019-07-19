import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOfLegalEntityComponent } from './product-of-legal-entity.component';

describe('ProductOfLegalEntityComponent', () => {
  let component: ProductOfLegalEntityComponent;
  let fixture: ComponentFixture<ProductOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOfLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
