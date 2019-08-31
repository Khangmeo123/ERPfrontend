import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderApproveComponent } from './delivery-order-approve.component';

describe('GoodsReturnApproveComponent', () => {
  let component: DeliveryOrderApproveComponent;
  let fixture: ComponentFixture<DeliveryOrderApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryOrderApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
