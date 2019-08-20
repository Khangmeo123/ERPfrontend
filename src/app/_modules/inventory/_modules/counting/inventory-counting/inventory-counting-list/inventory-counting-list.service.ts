import { Injectable } from '@angular/core';
import { InventoryCountingEntity } from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { InventoryCountingListRepository } from './inventory-counting-list.repository';
import { ToastrService } from 'ngx-toastr';
import {
    InventoryCountingSearchEntity,
    InventoryOrganizationOfCountingSearchEntity,
    EmployeeDetailOfCountingSearchEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.searchentity';
import { Entities, EnumEntity } from 'src/app/_helpers/entity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable()
export class InventoryCountingListService {
    public inventoryCountingList: BehaviorSubject<InventoryCountingEntity[]>;
    public inventoryCountingCount: BehaviorSubject<number>;
    public inventoryOrganizationList: BehaviorSubject<Entities>;
    public employeeDetailList: BehaviorSubject<Entities>;
    public statusList: BehaviorSubject<EnumEntity[]>;
    constructor(
        private fb: FormBuilder,
        private inventoryCountingListRepository: InventoryCountingListRepository,
        private toastrService: ToastrService,
    ) {
        this.inventoryCountingList = new BehaviorSubject([]);
        this.inventoryCountingCount = new BehaviorSubject(0);
        this.statusList = new BehaviorSubject([]);
    }


    getList(inventoryCountingSearchEntity: InventoryCountingSearchEntity) {
        forkJoin(this.inventoryCountingListRepository.getList(inventoryCountingSearchEntity),
            this.inventoryCountingListRepository.count(inventoryCountingSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.inventoryCountingList.next(list);
                }
                if (count) {
                    this.inventoryCountingCount.next(count);
                }
            });
    }

    enumListStatus() {
        this.inventoryCountingListRepository.enumListStatus().subscribe(res => {
            if (res) {
                this.statusList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
}
