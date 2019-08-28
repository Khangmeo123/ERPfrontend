import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, forkJoin } from 'rxjs';
import { Return } from 'src/app/_modules/inventory/_backend/return/return.entity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { FormBuilder } from '@angular/forms';
import { ReturnRepository } from './return-list.repository';
import { ReturnSearch } from 'src/app/_modules/inventory/_backend/return/return.searchentity';

@Injectable()

export class ReturnListService {

    public returnList: BehaviorSubject<Return[]> = new BehaviorSubject<Return[]>([]);
    public returnCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public statusList: BehaviorSubject<EnumEntity[]> = new BehaviorSubject<EnumEntity[]>([]);

    constructor(
        private fb: FormBuilder,
        private returnRepository: ReturnRepository,
    ) {
    }

    getList = (returnSearchEntity: ReturnSearch): Subscription => {
        return forkJoin(
            this.returnRepository.getList(returnSearchEntity),
            this.returnRepository.count(returnSearchEntity),
        )
            .subscribe(([list, count]) => {
                if (list) {
                    this.returnList.next(list);
                }
                if (count) {
                    this.returnCount.next(count);
                }
            });
    };
}
