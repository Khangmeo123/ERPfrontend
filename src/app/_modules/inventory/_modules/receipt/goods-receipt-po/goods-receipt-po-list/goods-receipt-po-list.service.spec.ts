import { TestBed } from '@angular/core/testing';

import { GoodsReceiptPOListService } from './goods-receipt-po-list.service';

describe('GoodsReceiptPoDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoodsReceiptPOListService = TestBed.get(GoodsReceiptPOListService);
    expect(service).toBeTruthy();
  });
});
