import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPriceCustomerComponent } from './special-price-customer.component';

describe('SpecialPriceCustomerComponent', () => {
  let component: SpecialPriceCustomerComponent;
  let fixture: ComponentFixture<SpecialPriceCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialPriceCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialPriceCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
