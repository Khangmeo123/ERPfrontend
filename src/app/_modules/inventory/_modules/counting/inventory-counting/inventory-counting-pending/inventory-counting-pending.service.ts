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
    SerialNumberOfInventoryCountingEntity,
    BatchOfInventoryCountingEntity,
    InventoryCountingEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import { InventoryCountingPendingRepository } from './inventory-counting-pending.repository';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { translate } from 'src/app/_helpers/string';

@Injectable()
export class InventoryCountingPendingService {
    public inventoryCountingForm: BehaviorSubject<FormGroup>;
    public itemDetailList: BehaviorSubject<Entities>;
    public itemDetailCodeList: BehaviorSubject<Entities>;
    public inventoryOrganizationList: BehaviorSubject<Entities>;
    public unitOfMeasureList: BehaviorSubject<Entities>;
    public binLocationList: BehaviorSubject<BinLocationOfInventoryCountingEntity[]>;
    public serialNumberList: BehaviorSubject<SerialNumberOfInventoryCountingEntity[]>;
    public batchList: BehaviorSubject<SerialNumberOfInventoryCountingEntity[]>;
    public inventoryCounterList: BehaviorSubject<any[]>;
    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private generalService: GeneralService,
        private inventoryCountingRepository: InventoryCountingPendingRepository) {
        this.inventoryCountingForm = new BehaviorSubject(this.fb.group(new InventoryCountingForm()));
        this.itemDetailList = new BehaviorSubject(new Entities());
        this.itemDetailCodeList = new BehaviorSubject(new Entities());
        this.unitOfMeasureList = new BehaviorSubject(new Entities());
        this.inventoryOrganizationList = new BehaviorSubject(new Entities());
        this.binLocationList = new BehaviorSubject([]);
        this.serialNumberList = new BehaviorSubject([]);
        this.batchList = new BehaviorSubject([]);
        this.inventoryCounterList = new BehaviorSubject([]);
    }

    // general:
    getDetail(inventoryCountingId?): Promise<InventoryCountingEntity> {
        const defered = new Promise<InventoryCountingEntity>((resolve, reject) => {
            if (inventoryCountingId !== null && inventoryCountingId !== undefined) {
                this.inventoryCountingRepository.getDetail(inventoryCountingId).subscribe(res => {
                    if (res) {
                        const inventoryCountingForm = this.fb.group(
                            new InventoryCountingForm(res),
                        );
                        resolve(res);
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


    // inventoryCounterContents:
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

    getListInventoryCounter(inventoryCounterId: string) {
        this.inventoryCountingRepository.getListInventoryCounter(inventoryCounterId).subscribe(res => {
            if (res) {
                this.inventoryCounterList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        })
    }

    // SerialNumber:
    getListSerialNumber(itemDetailId: string, inventoryCountingId: string) {
        this.inventoryCountingRepository.getListSerialNumber(itemDetailId, inventoryCountingId).subscribe(res => {
            if (res) {
                this.serialNumberList.next(res);
            }
        });
    }

    analyzeSerialCode(itemDetailId: string, event: any) {
        this.inventoryCountingRepository.analyzeSerialCode(itemDetailId, event).subscribe(res => {
            if (res) {
                const currentList = this.serialNumberList.getValue();
                const filterItem = currentList.filter(item => {
                    return item.serialNumber === res.serialNumber;
                });
                if (filterItem.length > 0) {
                    this.toastrService.error('Quét QR xảy ra lỗi, mã sản phẩm đã tồn tại!');
                    this.generalService.alertSound();
                } else {
                    this.toastrService.success('Hệ thống cập nhật thành công !');
                    currentList.push(res);
                    this.serialNumberList.next(currentList);
                }
            }
        }, err => {
            this.toastrService.error('Quét QR xảy ra lỗi!');
            this.generalService.alertSound();
        });
    }

    deleteSerialNumber(serialNumberId: string, itemDetailId: string, inventoryCountingId: string) {
        this.inventoryCountingRepository.deleteSerialNumber(serialNumberId).subscribe(res => {
            if (res) {
                this.getListSerialNumber(itemDetailId, inventoryCountingId);
            }
        });
    }

    checkAllSerialNumber(checked: boolean, serialNumbeList: SerialNumberOfInventoryCountingEntity[]) {
        serialNumbeList.forEach(item => {
            item.isSelected = checked;
        });
        this.serialNumberList.next(serialNumbeList);
    }

    deleteMultipleSerialNumber(serialNumbeList: any[], itemDetailId: string, inventoryCountingId: string) {
        this.inventoryCountingRepository.deleteMultipleSerialNumber(serialNumbeList).subscribe(res => {
            if (res) {
                this.getListSerialNumber(itemDetailId, inventoryCountingId);
            }
        });
    }

    importSerialNumber(file: File, itemDetailId: string, inventoryCountingId: string) {
        this.inventoryCountingRepository.importSerialNumber(file).subscribe(res => {
            if (res) {
                this.toastrService.success(translate('general.import.success'));
                this.getListSerialNumber(itemDetailId, inventoryCountingId);
            }
        }, err => {
            if (err) {
                this.toastrService.error(translate('general.import.error'));
            }
        });
    }

    // batch:

    getListBatch(itemDetailId: string, inventoryCountingId: string) {
        this.inventoryCountingRepository.getBatchList(itemDetailId, inventoryCountingId).subscribe(res => {
            if (res) {
                this.batchList.next(res);
            }
        });
    }

    analyzeBatchCode(itemDetailId: string, event: any) {
        this.inventoryCountingRepository.analyzeBatchCode(itemDetailId, event).subscribe(res => {
            if (res) {
                const currentList = this.batchList.getValue();
                const filterItem = currentList.filter(item => {
                    return item.id === res.id;
                });
                const indexOf = currentList.indexOf(filterItem[0]);
                this.toastrService.success('Hệ thống cập nhật thành công !');
                currentList[indexOf] = res;
                this.batchList.next(currentList);
            }
        }, err => {
            this.toastrService.error('Quét QR xảy ra lỗi!');
            this.generalService.alertSound();
        });
    }

    deleteBatch(batchId: string, itemDetailId: string, inventoryCountingId: string) {
        this.inventoryCountingRepository.deleteBatch(batchId).subscribe(res => {
            if (res) {
                this.getListBatch(itemDetailId, inventoryCountingId);
            }
        });
    }

    updateBatch(batch: BatchOfInventoryCountingEntity) {
        this.inventoryCountingRepository.updateBatch(batch).subscribe(res => {
            if (res) {
                const currentList = this.batchList.getValue();
                const filterItem = currentList.filter(item => {
                    return item.id === res.id;
                });
                const indexOf = currentList.indexOf(filterItem[0]);
                this.toastrService.success('Hệ thống cập nhật thành công !');
                currentList[indexOf] = res;
                this.batchList.next(currentList);
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
