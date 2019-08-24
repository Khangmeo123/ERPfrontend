import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GoodsIssueRepository } from './goods-issue-list.repository';
import { GoodsIssueEntity } from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.entity';
import { BehaviorSubject, Subscription, forkJoin } from 'rxjs';
import { GoodsIssueSearchEntity } from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.searchentity';
import { EnumEntity } from 'src/app/_helpers/entity';

@Injectable()
export class GoodsIssueListService {

    public goodsIssueList: BehaviorSubject<GoodsIssueEntity[]> = new BehaviorSubject<GoodsIssueEntity[]>([]);
    public goodsIssueCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public statusList: BehaviorSubject<EnumEntity[]> = new BehaviorSubject<EnumEntity[]>([]);
    
    constructor(
        private fb: FormBuilder,
        private goodsIssueRepository: GoodsIssueRepository,
      ) {
      }

      getList = (goodsIssueSearchEntity: GoodsIssueSearchEntity): Subscription => {
        return forkJoin(
          this.goodsIssueRepository.getList(goodsIssueSearchEntity),
          this.goodsIssueRepository.count(goodsIssueSearchEntity),
        )
          .subscribe(([list, count]) => {
            if (list) {
              this.goodsIssueList.next(list);
            }
            if (count) {
              this.goodsIssueCount.next(count);
            }
          });
      };
}