import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptPOReceiveComponent } from './goods-receipt-po-receive.component';

describe('DeliveryOrderApproveComponent', () => {
  let component: GoodsReceiptPOReceiveComponent;
  let fixture: ComponentFixture<GoodsReceiptPOReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoodsReceiptPOReceiveComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptPOReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
