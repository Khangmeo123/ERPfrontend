import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPriceSupplierComponent } from './special-price-supplier.component';

describe('SpecialPriceSupplierComponent', () => {
  let component: SpecialPriceSupplierComponent;
  let fixture: ComponentFixture<SpecialPriceSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialPriceSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialPriceSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
