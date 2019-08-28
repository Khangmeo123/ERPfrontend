import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { GoodsReturn } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.entity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { FormBuilder } from '@angular/forms';
import { GoodsReturnRepository } from './goods-return-list.repository';
import { GoodsReturnSearch } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.searchentity';

@Injectable()

export class GoodsReturnListService {

    public goodsReturnList: BehaviorSubject<GoodsReturn[]> = new BehaviorSubject<GoodsReturn[]>([]);
    public goodsReturnCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public statusList: BehaviorSubject<EnumEntity[]> = new BehaviorSubject<EnumEntity[]>([]);
    
    constructor(
        private fb: FormBuilder,
        private goodsReturnRepository: GoodsReturnRepository,
      ) {
      }

      getList = (GoodsReturnSearchEntity: GoodsReturnSearch): Subscription => {
        return forkJoin(
          this.goodsReturnRepository.getList(GoodsReturnSearchEntity),
          this.goodsReturnRepository.count(GoodsReturnSearchEntity),
        )
          .subscribe(([list, count]) => {
            if (list) {
              this.goodsReturnList.next(list);
            }
            if (count) {
              this.goodsReturnCount.next(count);
            }
          });
      };
}
