import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderSendComponent } from './delivery-order-send.component';

describe('GoodsReturnApproveComponent', () => {
  let component: DeliveryOrderSendComponent;
  let fixture: ComponentFixture<DeliveryOrderSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryOrderSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
