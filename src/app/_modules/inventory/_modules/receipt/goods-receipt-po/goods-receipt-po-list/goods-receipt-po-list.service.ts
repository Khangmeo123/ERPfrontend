import { EnumEntity } from '../../../../../../_helpers/entity';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { GoodsReceiptPOEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import { GoodsReceiptPOSearchEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { FormBuilder } from '@angular/forms';
import { GoodsReceiptPOListRepository } from './goods-receipt-po-list.repository';
import { Injectable } from '@angular/core';

@Injectable()
export class GoodsReceiptPOListService {
  public goodsReceiptPOList: BehaviorSubject<GoodsReceiptPOEntity[]>;

  public goodsReceiptPOCount: BehaviorSubject<number>;

  public statusList: BehaviorSubject<EnumEntity[]>;

  constructor(
    private fb: FormBuilder,
    private goodsReceiptPORepository: GoodsReceiptPOListRepository,
  ) {
    this.goodsReceiptPOList = new BehaviorSubject([]);
    this.goodsReceiptPOCount = new BehaviorSubject(0);
    this.statusList = new BehaviorSubject([]);
  }

  getList = (goodsReceiptPOSearchEntity: GoodsReceiptPOSearchEntity) => {
    forkJoin(this.goodsReceiptPORepository.getList(goodsReceiptPOSearchEntity),
      this.goodsReceiptPORepository.count(goodsReceiptPOSearchEntity))
      .subscribe(([list, count]) => {
        if (list) {
          this.goodsReceiptPOList.next(list);
        }
        if (count) {
          this.goodsReceiptPOCount.next(count);
        }
      });
  };
}
