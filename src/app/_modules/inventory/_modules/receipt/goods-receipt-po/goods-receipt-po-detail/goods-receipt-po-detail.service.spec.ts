import { TestBed } from '@angular/core/testing';

import { GoodsReceiptPoDetailService } from './goods-receipt-po-detail.service';

describe('GoodsReceiptPoDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoodsReceiptPoDetailService = TestBed.get(GoodsReceiptPoDetailService);
    expect(service).toBeTruthy();
  });
});
