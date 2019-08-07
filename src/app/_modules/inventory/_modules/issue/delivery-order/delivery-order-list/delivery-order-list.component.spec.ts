import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderListComponent } from './delivery-order-list.component';

describe('DeliveryOrderListComponent', () => {
  let component: DeliveryOrderListComponent;
  let fixture: ComponentFixture<DeliveryOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
