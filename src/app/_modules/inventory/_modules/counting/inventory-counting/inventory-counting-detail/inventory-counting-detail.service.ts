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
    InventoryCounterContents,
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
    getDetail(inventoryCountingId?): Promise<any> {
        const defered = new Promise<any>((resolve, reject) => {
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

    send(inventoryCountingEntity: any) {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.inventoryCountingRepository.send(inventoryCountingEntity).subscribe(res => {
                if (res) {
                    this.toastrService.success('Cập nhật thành công !');
                    resolve();
                }
            }, err => {
                if (err) {
                    this.inventoryCountingForm.next(this.fb.group(
                        new InventoryCountingForm(err),
                    ));
                    this.toastrService.error('Có lỗi xảy ra trong quá trình cập nhật');
                    reject();
                }
            });
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
                    this.toastrService.error('Có lỗi xảy ra trong quá trình cập nhật');
                    reject();
                }
            });
        });
        return defered;
    }

    delete(inventoryCountingId: string) {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.inventoryCountingRepository.delete(inventoryCountingId).subscribe(res => {
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

    selectEmployee(inventoryCountingForm: FormGroup, employeeList: any[]) {
        const inventoryCounters = inventoryCountingForm.get('inventoryCounters') as FormArray;
        inventoryCounters.clear();
        employeeList.forEach(item => {
            inventoryCounters.push(this.fb.group(new InventoryCounterContents(item)));
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
        for (let i = deletedList.length - 1; i >= 0; i--) {
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

    selectItemDetail(inventoryCountingForm: FormGroup, index: number, itemDetail: any) {
        const currentFormArray = inventoryCountingForm.get('inventoryCountingContents') as FormArray;
        const currentFormGroup = currentFormArray.controls[index] as FormGroup;
        if (itemDetail !== null) {
            currentFormGroup.controls.itemDetailId.setValue(itemDetail.id);
            currentFormGroup.controls.itemDetailCode.setValue(itemDetail.code);
            currentFormGroup.controls.itemDetailName.setValue(itemDetail.name);
            currentFormGroup.controls.itemDetailUnitOfMeasureId.setValue(itemDetail.unitOfMeasureId);
            currentFormGroup.controls.itemDetailUnitOfMeasureCode.setValue(itemDetail.unitOfMeasureCode);
            currentFormGroup.controls.itemDetailUnitOfMeasureName.setValue(itemDetail.unitOfMeasureName);
            currentFormGroup.controls.quantityOnDocumentDate.setValue(itemDetail.quantityOnDocumentDate);
        } else {
            currentFormGroup.controls.itemDetailId.setValue(null);
            currentFormGroup.controls.itemDetailCode.setValue(null);
            currentFormGroup.controls.itemDetailName.setValue(null);
            currentFormGroup.controls.itemDetailUnitOfMeasureId.setValue(null);
            currentFormGroup.controls.itemDetailUnitOfMeasureCode.setValue(null);
            currentFormGroup.controls.itemDetailUnitOfMeasureName.setValue(null);
            currentFormGroup.controls.quantityOnDocumentDate.setValue(null);
        }
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
                if (item.isSelected) {
                    const filterItem = currentArray.value.filter(elm => elm.itemDetailId === item.id)[0];
                    if (!filterItem) {
                        const formGroup = this.fb.group(new InventoryCountingContentForm());
                        formGroup.get('itemDetailId').setValue(item.id);
                        formGroup.get('itemDetailCode').setValue(item.code);
                        formGroup.get('itemDetailName').setValue(item.name);
                        formGroup.get('itemDetailUnitOfMeasureId').setValue(item.unitOfMeasureId);
                        formGroup.get('itemDetailUnitOfMeasureName').setValue(item.unitOfMeasureName);
                        formGroup.get('itemDetailUnitOfMeasureCode').setValue(item.unitOfMeasureCode);
                        currentArray.push(formGroup);
                    }
                }
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
}
