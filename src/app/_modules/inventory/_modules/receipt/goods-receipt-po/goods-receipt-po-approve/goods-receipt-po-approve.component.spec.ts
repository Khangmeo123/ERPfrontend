import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptPOApproveComponent } from './goods-receipt-po-approve.component';

describe('GoodsIssueDetailComponent', () => {
  let component: GoodsReceiptPOApproveComponent;
  let fixture: ComponentFixture<GoodsReceiptPOApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoodsReceiptPOApproveComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptPOApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
