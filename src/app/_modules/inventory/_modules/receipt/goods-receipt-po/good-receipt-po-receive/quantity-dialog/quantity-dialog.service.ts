import {Injectable} from '@angular/core';
import {GoodsReceiptPOContent} from '../../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import {QuantityDialogRepository} from './quantity-dialog.repository';
import {BehaviorSubject} from 'rxjs';
import {translate} from '../../../../../../../_helpers/string';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class QuantityDialogService {

  quantity: BehaviorSubject<GoodsReceiptPOContent> = new BehaviorSubject<GoodsReceiptPOContent>(null);

  constructor(private quantityDialogRepository: QuantityDialogRepository, private toastrService: ToastrService) {
  }

  getQuantity = (goodsReceiptPOContentId: string) => {
    this.quantityDialogRepository.getGoodsReceiptPOContent(goodsReceiptPOContentId)
      .subscribe(
        (goodsReceiptPOContent: GoodsReceiptPOContent) => {
          if (goodsReceiptPOContent) {
            this.quantity.next(goodsReceiptPOContent);
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
