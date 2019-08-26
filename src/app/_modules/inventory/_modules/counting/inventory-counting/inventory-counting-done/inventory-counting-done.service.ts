import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    InventoryCountingForm,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.form';
import {
    BinLocationOfInventoryCountingEntity,
    InventoryCountingEntity,
} from 'src/app/_modules/inventory/_backend/inventory-counting/inventory-counting.entity';
import * as _ from 'lodash';
import { InventoryCountingDoneRepository } from './inventory-counting-done.repository';
import { SpinnerService } from 'src/app/_services';
@Injectable()
export class InventoryCountingDoneService {
    public inventoryCountingForm: BehaviorSubject<FormGroup>;
    public binLocationList: BehaviorSubject<BinLocationOfInventoryCountingEntity[]>;
    public inventoryCounterList: BehaviorSubject<any[]>;
    constructor(
        private fb: FormBuilder,
        private spinnerService: SpinnerService,
        private inventoryCountingRepository: InventoryCountingDoneRepository) {
        this.inventoryCountingForm = new BehaviorSubject(this.fb.group(new InventoryCountingForm()));
        this.binLocationList = new BehaviorSubject([]);
        this.inventoryCounterList = new BehaviorSubject([]);
    }

    // general:
    getDetail(inventoryCountingId?): Promise<InventoryCountingEntity> {
        this.spinnerService.show();
        const defered = new Promise<InventoryCountingEntity>((resolve, reject) => {
            if (inventoryCountingId !== null && inventoryCountingId !== undefined) {
                this.inventoryCountingRepository.getDetail(inventoryCountingId).subscribe(res => {
                    if (res) {
                        this.spinnerService.hide();
                        const inventoryCountingForm = this.fb.group(
                            new InventoryCountingForm(res),
                        );
                        this.inventoryCountingForm.next(inventoryCountingForm);
                        resolve(res);
                    }
                }, err => {
                    if (err) {
                        this.spinnerService.hide();
                        reject();
                    }
                });
            }
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
}
