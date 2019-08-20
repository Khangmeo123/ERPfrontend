import { BinLocationEntity } from './../../../../../master-data/_backend/bin-location/bin-location.entity';
import { Entities } from 'src/app/_helpers/entity';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
    InventoryCountingForm,
    InventoryCountingContentForm,
    InventoryCounterContentForm,
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
    InventoryCountingEntity,
    CounterContentByItemDetailEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import { InventoryCountingPendingRepository } from './inventory-counting-pending.repository';
import { translate } from 'src/app/_helpers/string';
import * as _ from 'lodash';
import { GeneralService } from 'src/app/_services/general-service.service';
@Injectable()
export class InventoryCountingPendingService {
    public inventoryCountingForm: BehaviorSubject<FormGroup>;
    public binLocationList: BehaviorSubject<BinLocationOfInventoryCountingEntity[]>;
    public serialNumberList: BehaviorSubject<CounterContentByItemDetailEntity[]>;
    public batchList: BehaviorSubject<CounterContentByItemDetailEntity[]>;
    public inventoryCounterList: BehaviorSubject<any[]>;
    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private generalService: GeneralService,
        private inventoryCountingRepository: InventoryCountingPendingRepository) {
        this.inventoryCountingForm = new BehaviorSubject(this.fb.group(new InventoryCountingForm()));
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
                        this.inventoryCountingForm.next(inventoryCountingForm);
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
    getListBinLocation(inventoryOrganizationId: string, itemDetailId: string) {
        this.inventoryCountingRepository.getListBinLocation(inventoryOrganizationId, itemDetailId).subscribe(res => {
            if (res) {
                this.binLocationList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    getListInventoryCounter(inventoryCountingId: string, employeeDetailId: string) {
        this.inventoryCountingRepository.getListInventoryCounter(inventoryCountingId, employeeDetailId).subscribe(res => {
            if (res) {
                this.inventoryCounterList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    analyzeCodeOutSide(inventoryCountingId: string, code: string) {
        this.inventoryCountingRepository.analyzeCodeOutSide(inventoryCountingId, code).subscribe(res => {
            if (res) {
                const currentForm = this.inventoryCountingForm.getValue();
                const currentArray = currentForm.get('inventoryCounterContents') as FormArray;
                for (const control of currentArray.controls) {
                    if (control instanceof FormGroup) {
                        if (control.value.itemDetailId === res.itemDetailId) {
                            control.patchValue(res);
                        }
                    }
                }
                this.toastrService.success('Hệ thống cập nhật thành công!');
                this.inventoryCountingForm.next(currentForm);
            }
        }, err => {
            if (err) {
                this.toastrService.error('Quét QR xảy ra lỗi!');
                this.generalService.alertSound();
            }
        });
    }

    resetInventoryCounterContent(inventoryCountingId: string, inventoryCountingForm: FormGroup) {
        const listInventoryCounterIds = inventoryCountingForm.value.inventoryCounterContents.map(item => item.id);
        this.inventoryCountingRepository.resetInventoryCounterContent(inventoryCountingId, listInventoryCounterIds).subscribe(res => {
            if (res) {
                this.getDetail(inventoryCountingId);
            }
        });
    }

    updateQuantity(inventoryCountingId: string, itemDetailId: string, quantity: number) {
        this.inventoryCountingRepository.updateQuantity(inventoryCountingId, itemDetailId, quantity).subscribe(res => {
            if (res) {
                const currentForm = this.inventoryCountingForm.getValue();
                const currentArray = currentForm.get('inventoryCounterContents') as FormArray;
                for (const control of currentArray.controls) {
                    if (control instanceof FormGroup) {
                        if (control.value.itemDetailId === res.itemDetailId) {
                            control.patchValue(res);
                        }
                    }
                }
                this.toastrService.success('Hệ thống cập nhật thành công!');
                this.inventoryCountingForm.next(currentForm);
            }
        }, err => {
            if (err) {
                this.toastrService.error('Quét QR xảy ra lỗi!');
            }
        });
    }

    // SerialNumber:
    getListSerialNumber(itemDetailId: string, inventoryCountingId: string) {
        this.inventoryCountingRepository.getListSerialNumber(itemDetailId, inventoryCountingId).subscribe(res => {
            if (res) {
                this.serialNumberList.next(res);
            }
        });
    }

    analyzeSerialCode(itemDetailId: string, inventoryCountingId: string, event: any) {
        this.inventoryCountingRepository.analyzeSerialCode(itemDetailId, inventoryCountingId, event).subscribe(res => {
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

    checkAllSerialNumber(checked: boolean, serialNumbeList: CounterContentByItemDetailEntity[]) {
        serialNumbeList.forEach(item => {
            item.isSelected = checked;
        });
        this.serialNumberList.next(serialNumbeList);
    }

    deleteMultipleSerialNumber(serialNumbeList: any[], itemDetailId: string, inventoryCountingId: string) {
        const listIds = serialNumbeList.map(item => item.id)
        this.inventoryCountingRepository.deleteMultipleSerialNumber(inventoryCountingId, listIds).subscribe(res => {
            if (res) {
                this.getListSerialNumber(itemDetailId, inventoryCountingId);
            }
        });
    }

    importSerialNumber(file: File, itemDetailId: string, inventoryCountingId: string) {
        this.inventoryCountingRepository.importSerialNumber(itemDetailId, inventoryCountingId, file).subscribe(res => {
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

    saveSerialNumber(inventoryCountingForm: FormGroup, serialNumberList: CounterContentByItemDetailEntity[]) {
        const currentArray = inventoryCountingForm.get('inventoryCounterContents') as FormArray;
        currentArray.controls.forEach(control => {
            if (control.get('itemDetailId').value === serialNumberList[0].itemDetailId) {
                const sumQuantity = _.sumBy(serialNumberList, item => item.quantity);
                control.get('quantity').setValue(sumQuantity);
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

    saveBatch(inventoryCountingForm: FormGroup, batchList: CounterContentByItemDetailEntity[]) {
        const currentArray = inventoryCountingForm.get('inventoryCounterContents') as FormArray;
        currentArray.controls.forEach(control => {
            if (control.get('itemDetailId').value === batchList[0].itemDetailId) {
                const sumQuantity = _.sumBy(batchList, item => item.quantity);
                control.get('quantity').setValue(sumQuantity);
            }
        });
    }

    analyzeBatchCode(itemDetailId: string, inventoryCountingId: string, event: any) {
        this.inventoryCountingRepository.analyzeBatchCode(itemDetailId, inventoryCountingId, event).subscribe(res => {
            if (res) {
                const currentList = this.batchList.getValue();
                const filterItem = currentList.filter(item => {
                    return item.itemDetailId === res.itemDetailId;
                });
                const indexOf = currentList.indexOf(filterItem[0]);
                currentList[indexOf] = res;
                this.toastrService.success('Hệ thống cập nhật thành công !');
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

    updateBatch(batch: CounterContentByItemDetailEntity) {
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
}
