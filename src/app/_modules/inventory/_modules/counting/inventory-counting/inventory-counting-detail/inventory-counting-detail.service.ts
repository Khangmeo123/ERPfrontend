import { BinLocationEntity } from './../../../../../master-data/_backend/bin-location/bin-location.entity';
import { InventoryCountingDetailRepository } from './inventory-counting-detail.repository';
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

@Injectable()
export class InventoryCountingDetailService {
    public inventoryCountingForm: BehaviorSubject<FormGroup>;
    public employeeDetailList: BehaviorSubject<Entities>;
    public itemDetailList: BehaviorSubject<Entities>;
    public itemDetailExtendList: BehaviorSubject<ItemDetailOfCountingEntity[]>;
    public itemDetailCodeList: BehaviorSubject<Entities>;
    public inventoryOrganizationList: BehaviorSubject<Entities>;
    public unitOfMeasureList: BehaviorSubject<Entities>;
    public binLocationList: BehaviorSubject<BinLocationOfInventoryCountingEntity[]>;
    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private inventoryCountingRepository: InventoryCountingDetailRepository) {
        this.inventoryCountingForm = new BehaviorSubject(this.fb.group(new InventoryCountingForm()));
        this.employeeDetailList = new BehaviorSubject(new Entities());
        this.itemDetailExtendList = new BehaviorSubject([]);
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

    selectEmployee(inventoryCountingForm: FormGroup, employeeListIds: string[]) {
        const inventoryCounters = inventoryCountingForm.get('inventoryCounters') as FormArray;
        inventoryCounters.clear();
        employeeListIds.forEach(item => {
            inventoryCounters.push(new FormControl(item));
        });
        this.inventoryCountingForm.next(inventoryCountingForm);
    }


    // inventoryCountingContents:
    addInventoryCountingContent(inventoryCountingForm: FormGroup) {
        const currentArray = inventoryCountingForm.get('inventoryCountingContents') as FormArray;
        currentArray.push(this.fb.group(new InventoryCountingContentForm()));
        this.inventoryCountingForm.next(inventoryCountingForm);
    }

    deleteMultiple(inventoryCountingForm: FormGroup) {
        const inventoryCountingContents = inventoryCountingForm.get('inventoryCountingContents') as FormArray;
        const deletedList = [];
        for (const control of inventoryCountingContents.controls) {
            if (control.get('isSelected').value) {
                deletedList.push(inventoryCountingContents.controls.indexOf(control));
                control.get('isSelected').setValue(false);
            }
        }
        for (let i = deletedList.length; i >= 0; i--) {
            inventoryCountingContents.removeAt(deletedList[i]);
        }
        this.inventoryCountingForm.next(inventoryCountingForm);
    }

    checkAllContents(inventoryCountingForm: FormGroup, checked: boolean) {
        const inventoryCountingContents = inventoryCountingForm.get('inventoryCountingContents') as FormArray;
        for (const control of inventoryCountingContents.controls) {
            control.get('isSelected').setValue(checked);
        }
        this.inventoryCountingForm.next(inventoryCountingForm);
    }

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

    selectItemDetail(inventoryCountingForm: FormGroup, index: number, itemDetail: any) {
        const currentFormArray = inventoryCountingForm.get('inventoryCountingContents') as FormArray;
        const currentFormGroup = currentFormArray.controls[index] as FormGroup;
        currentFormGroup.controls.itemDetailId.setValue(itemDetail.id);
        currentFormGroup.controls.itemDetailCode.setValue(itemDetail.code);
        currentFormGroup.controls.itemDetailName.setValue(itemDetail.name);
        currentFormGroup.controls.itemDetailUnitOfMeasureId.setValue(itemDetail.unitOfMeasureId);
        currentFormGroup.controls.itemDetailUnitOfMeasureCode.setValue(itemDetail.unitOfMeasureCode);
        currentFormGroup.controls.itemDetailUnitOfMeasureName.setValue(itemDetail.unitOfMeasureName);
        this.inventoryCountingForm.next(inventoryCountingForm);
    }

    checkAllItemDetail(checked: boolean, itemDetailList: ItemDetailOfCountingEntity[]) {
        itemDetailList.forEach(element => {
            element.isSelected = checked;
        });
        this.itemDetailExtendList.next(itemDetailList);
    }

    getItemDetailList(data: any) {
        this.inventoryCountingRepository.getListItemDetail(data).subscribe(res => {
            if (res) {
                this.itemDetailExtendList.next(res);
            }
        });
    }

    saveItemDetail(inventoryCountingForm: FormGroup, itemDetailList: any[]) {
        const currentArray = inventoryCountingForm.get('inventoryCountingContents') as FormArray;
        if (itemDetailList.length > 0) {
            itemDetailList.forEach(item => {
                currentArray.push(this.fb.group(new InventoryCountingForm(item)));
            });
        }
        this.inventoryCountingForm.next(inventoryCountingForm);
    }

    // employeeDetail:
    dropListEmployeeDetail(employeeDetailOfCountingSearchEntity: EmployeeDetailOfCountingSearchEntity) {
        this.inventoryCountingRepository.dropListEmployeeDetail(employeeDetailOfCountingSearchEntity).subscribe(res => {
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
                return this.inventoryCountingRepository.dropListEmployeeDetail(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.employeeDetailList.next(res);
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
