import { Injectable } from '@angular/core';
import { BatchDialogRepository } from './batch-dialog.repository';
import { GoodsReceiptPOContent } from '../../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BatchDialogService {

  goodsReceiptPOContent: BehaviorSubject<GoodsReceiptPOContent> = new BehaviorSubject<GoodsReceiptPOContent>(new GoodsReceiptPOContent());

  constructor(private batchDialogRepository: BatchDialogRepository) {
  }

  getBatch = (goodsReceiptPOContentId: string) => {
    return new Promise<void>((resolve, reject) => {
      this.batchDialogRepository.getGoodsReceiptPOContent(goodsReceiptPOContentId)
        .subscribe(
          (goodsReceiptPOContent: GoodsReceiptPOContent) => {
            if (goodsReceiptPOContent) {
              this.goodsReceiptPOContent.next(goodsReceiptPOContent);
              resolve();
            }
          },
          (error: Error) => {
            reject(error);
          });
    });
  };
}
