import { TestBed } from '@angular/core/testing';

import { GoodsReceiptPOReceiveService } from './goods-receipt-po-receive.service';

describe('GoodsReceiptPoDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoodsReceiptPOReceiveService = TestBed.get(GoodsReceiptPOReceiveService);
    expect(service).toBeTruthy();
  });
});
