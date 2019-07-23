import { SupplierDetailEntity } from './supplier-detail.entity';
import { FormModel } from 'src/app/_helpers/form-model';
import { FormControl, FormArray } from '@angular/forms';
import { requiredField } from 'src/app/_helpers';

export class SupplierForm extends FormModel {
    code = new FormControl('', [requiredField]);
    name = new FormControl('', [requiredField]);
    taxNumber = new FormControl();
    note = new FormControl();
    statusId = new FormControl('', [requiredField]);
    statusName = new FormControl('', [requiredField]);

    infoContacts = new FormArray([]);
    bankAccounts = new FormArray([]);
    constructor(supplierDetailEntity?: SupplierDetailEntity) {
        super();
        if (supplierDetailEntity !== null && supplierDetailEntity !== undefined) {
            Object.keys(supplierDetailEntity).forEach((item) => {
                if (supplierDetailEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(supplierDetailEntity[item]);
                }
            });
        }
    }
}