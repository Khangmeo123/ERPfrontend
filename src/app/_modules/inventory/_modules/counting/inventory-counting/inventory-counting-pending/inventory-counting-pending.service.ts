import { BinLocationEntity } from './../../../../../master-data/_backend/bin-location/bin-location.entity';
import { Entities } from 'src/app/_helpers/entity';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
    InventoryCountingForm,
    InventoryCountingContentForm,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.form';
import {
    EmployeeDetailOfCountingSearchEntity,
    InventoryOrganizationOfCountingSearchEntity,
    ItemDetailOfCountingSearchEntity,
    UnitOfMeasureOfCountingSearchEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {
    BinLocationOfInventoryCountingEntity,
    ItemDetailOfCountingEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import { InventoryCountingPendingRepository } from './inventory-counting-pending.repository';

@Injectable()
export class InventoryCountingPendingService {
    public inventoryCountingForm: BehaviorSubject<FormGroup>;
    public itemDetailList: BehaviorSubject<Entities>;
    public itemDetailCodeList: BehaviorSubject<Entities>;
    public inventoryOrganizationList: BehaviorSubject<Entities>;
    public unitOfMeasureList: BehaviorSubject<Entities>;
    public binLocationList: BehaviorSubject<BinLocationOfInventoryCountingEntity[]>;
    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private inventoryCountingRepository: InventoryCountingPendingRepository) {
        this.inventoryCountingForm = new BehaviorSubject(this.fb.group(new InventoryCountingForm()));
        this.itemDetailList = new BehaviorSubject(new Entities());
        this.itemDetailCodeList = new BehaviorSubject(new Entities());
        this.unitOfMeasureList = new BehaviorSubject(new Entities());
        this.inventoryOrganizationList = new BehaviorSubject(new Entities());
        this.binLocationList = new BehaviorSubject([]);
    }

    // general:
    getDetail(inventoryCountingId?): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            if (inventoryCountingId !== null && inventoryCountingId !== undefined) {
                this.inventoryCountingRepository.getDetail(inventoryCountingId).subscribe(res => {
                    if (res) {
                        const inventoryCountingForm = this.fb.group(
                            new InventoryCountingForm(res),
                        );
                        resolve();
                    }
                }, err => {
                    if (err) {
                        console.log(err);
                        reject();
                    }
                });
            }
        });
        return defered;
    }

    save(inventoryCountingEntity: any) {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.inventoryCountingRepository.save(inventoryCountingEntity).subscribe(res => {
                if (res) {
                    this.toastrService.success('Cập nhật thành công !');
                    resolve();
                }
            }, err => {
                if (err) {
                    this.inventoryCountingForm.next(this.fb.group(
                        new InventoryCountingForm(err),
                    ));
                    reject();
                }
            });
        });
        return defered;
    }


    // inventoryCountingContents:
    getListBinLocation(inventoryOrganizationId: string, inventoryCountingContentId: string) {
        this.inventoryCountingRepository.getListBinLocation(inventoryOrganizationId, inventoryCountingContentId).subscribe(res => {
            if (res) {
                this.binLocationList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    // inventoryOrganization:
    dropListInvetoryOrganization(inventoryOrganizationOfCountingSearchEntity: InventoryOrganizationOfCountingSearchEntity) {
        this.inventoryCountingRepository.dropListInventoryOrganization(inventoryOrganizationOfCountingSearchEntity).subscribe(res => {
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
                return this.inventoryCountingRepository.dropListInventoryOrganization(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.inventoryOrganizationList.next(res);
                }
            });
    }

    // itemDetail:
    dropListItemDetail(itemDetailOfCountingSearchEntity: ItemDetailOfCountingSearchEntity) {
        this.inventoryCountingRepository.dropListItemDetail(itemDetailOfCountingSearchEntity).subscribe(res => {
            if (res) {
                this.itemDetailList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchItemDetail(itemDetailOfCountingSearchEntity: Observable<ItemDetailOfCountingSearchEntity>) {
        itemDetailOfCountingSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.inventoryCountingRepository.dropListItemDetail(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.itemDetailList.next(res);
                }
            });
    }

    // itemDetailCode:
    dropListItemDetailCode(itemDetailOfCountingSearchEntity: ItemDetailOfCountingSearchEntity) {
        this.inventoryCountingRepository.dropListItemDetailCode(itemDetailOfCountingSearchEntity).subscribe(res => {
            if (res) {
                this.itemDetailCodeList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchItemDetailCode(itemDetailOfCountingSearchEntity: Observable<ItemDetailOfCountingSearchEntity>) {
        itemDetailOfCountingSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.inventoryCountingRepository.dropListItemDetailCode(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.itemDetailCodeList.next(res);
                }
            });
    }

    // unitOfMeasure:
    dropListUnitOfMeasure(unitOfMeasureOfCountingSearchEntity: UnitOfMeasureOfCountingSearchEntity) {
        this.inventoryCountingRepository.dropListUnitOfMeasure(unitOfMeasureOfCountingSearchEntity).subscribe(res => {
            if (res) {
                this.unitOfMeasureList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchUnitOfMeasure(unitOfMeasureOfCountingSearchEntity:
        Observable<UnitOfMeasureOfCountingSearchEntity>) {
        unitOfMeasureOfCountingSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.inventoryCountingRepository.dropListUnitOfMeasure(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.unitOfMeasureList.next(res);
                }
            });
    }
}
