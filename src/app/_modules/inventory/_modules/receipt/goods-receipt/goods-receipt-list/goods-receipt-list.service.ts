import { ToastrService } from 'ngx-toastr';
import { EnumEntity } from '../../../../../../_helpers/entity';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { GoodsReceipt } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';
import { GoodsReceiptListRepository } from './goods-receipt-list.repository';
import { GoodsReceiptSearch } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.searchentity';

@Injectable()
export class GoodsReceiptListService {

  public goodsReceiptList: BehaviorSubject<GoodsReceipt[]> = new BehaviorSubject<GoodsReceipt[]>([]);

  public goodsReceiptCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public statusList: BehaviorSubject<EnumEntity[]> = new BehaviorSubject<EnumEntity[]>([]);

  constructor(
    private fb: FormBuilder,
    private goodsReceiptRepository: GoodsReceiptListRepository,
    private toastrService: ToastrService,
  ) {
  }

  getList(goodsReceiptSearch: GoodsReceiptSearch): Subscription {
    return forkJoin(
      this.goodsReceiptRepository.getList(goodsReceiptSearch),
      this.goodsReceiptRepository.count(goodsReceiptSearch),
    )
      .subscribe(([list, count]) => {
        if (list) {
          this.goodsReceiptList.next(list);
        }
        if (count) {
          this.goodsReceiptCount.next(count);
        }
      });
  }

}
