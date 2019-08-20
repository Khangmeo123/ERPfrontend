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
        this.inventoryOrganizationList = new BehaviorSubject(new Entities());
        this.employeeDetailList = new BehaviorSubject(new Entities());
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

    dropListEmployeeDetail(employeeDetailOfCountingSearchEntity: EmployeeDetailOfCountingSearchEntity) {
        this.inventoryCountingListRepository.dropListEmployeeDetail(employeeDetailOfCountingSearchEntity).subscribe(res => {
            if (res) {
                this.employeeDetailList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchEmployeeDetail(employeeDetailOfCountingSearchEntity: Observable<EmployeeDetailOfCountingSearchEntity>) {
        employeeDetailOfCountingSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.inventoryCountingListRepository.dropListEmployeeDetail(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.employeeDetailList.next(res);
                }
            });
    }

    dropListInvetoryOrganization(inventoryOrganizationOfCountingSearchEntity: InventoryOrganizationOfCountingSearchEntity) {
        this.inventoryCountingListRepository.dropListInventoryOrganization(inventoryOrganizationOfCountingSearchEntity).subscribe(res => {
            if (res) {
                this.inventoryOrganizationList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchInvetoryOrganization(inventoryOrganizationOfCountingSearchEntity:
        Observable<InventoryOrganizationOfCountingSearchEntity>) {
        inventoryOrganizationOfCountingSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.inventoryCountingListRepository.dropListInventoryOrganization(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.inventoryOrganizationList.next(res);
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
