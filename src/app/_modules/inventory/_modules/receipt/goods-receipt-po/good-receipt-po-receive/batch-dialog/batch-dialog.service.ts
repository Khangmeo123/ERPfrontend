import {Injectable} from '@angular/core';
import {BatchDialogRepository} from './batch-dialog.repository';
import {BatchEntity, GoodsReceiptPOContent} from '../../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {translate} from '../../../../../../../_helpers/string';

@Injectable({
  providedIn: 'root',
})
export class BatchDialogService {

  public batch: BehaviorSubject<GoodsReceiptPOContent> = new BehaviorSubject<GoodsReceiptPOContent>(null);

  constructor(private batchDialogRepository: BatchDialogRepository, private toastrService: ToastrService) {
  }

  getBatch = (goodsReceiptPOContentId: string): Promise<GoodsReceiptPOContent> => {
    return new Promise<GoodsReceiptPOContent>((resolve, reject) => {
      this.batchDialogRepository.getGoodsReceiptPOContent(goodsReceiptPOContentId)
        .subscribe(
          (goodsReceiptPOContent: GoodsReceiptPOContent) => {
            if (goodsReceiptPOContent) {
              this.batch.next(goodsReceiptPOContent);
              resolve(goodsReceiptPOContent);
            }
          },
          (error: Error) => {
            reject(error);
          });
    });
  };

  analyzeBatchCode = (itemDetailId: string, qrCode: string) => {
    this.batchDialogRepository.analyzeBatchCode(itemDetailId, qrCode)
      .subscribe(
        (result) => {
          if (result) {
            const currentBatch = this.batch.getValue();
            const currentBatchList = currentBatch.goodsReceiptPOBatches;
            const existingBatch: BatchEntity = currentBatchList.find((item) => item.batchNumber === result.batchNumber);
            if (existingBatch) {
              existingBatch.quantity += result.quantity;
            } else {
              currentBatchList.push(result);
            }
            this.batch.next(currentBatch);
          }
        },
        (error: Error) => {
          if (error) {
            this.toastrService.error(translate('general.scanQRCodeError'));
          }
          throw error;
        },
      );
  };
}
