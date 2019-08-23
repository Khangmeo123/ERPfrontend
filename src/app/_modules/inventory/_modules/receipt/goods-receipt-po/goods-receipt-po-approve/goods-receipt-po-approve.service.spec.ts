import { TestBed } from '@angular/core/testing';

import { GoodsReceiptPOApproveService } from './goods-receipt-po-approve.service';

describe('GoodsReceiptPoDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoodsReceiptPOApproveService = TestBed.get(GoodsReceiptPOApproveService);
    expect(service).toBeTruthy();
  });
});
