import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GoodsIssueRepository } from './goods-issue-list.repository';
import { BehaviorSubject, Subscription, forkJoin } from 'rxjs';
import { EnumEntity } from 'src/app/_helpers/entity';
import {GoodsIssueSearch} from '../../../../_backend/goods-issue/goods-issue.searchentity';
import {GoodsIssue} from '../../../../_backend/goods-issue/goods-issue.entity';

@Injectable()
export class GoodsIssueListService {

    public goodsIssueList: BehaviorSubject<GoodsIssue[]> = new BehaviorSubject<GoodsIssue[]>([]);
    public goodsIssueCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public statusList: BehaviorSubject<EnumEntity[]> = new BehaviorSubject<EnumEntity[]>([]);
    
    constructor(
        private fb: FormBuilder,
        private goodsIssueRepository: GoodsIssueRepository,
      ) {
      }

      getList = (goodsIssueSearchEntity: GoodsIssueSearch): Subscription => {
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
