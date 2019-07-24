import { FormControl, FormArray } from '@angular/forms';
import { FormModel } from 'src/app/_helpers/form-model';
import { requiredField } from 'src/app/_helpers';
import { LegalItemDetailEntity } from './legal-item-detail.entity';

export class LegalItemDetailForm extends FormModel {
    code = new FormControl('', [requiredField]);
    name = new FormControl('', [requiredField]);
    taxCode = new FormControl();
    note = new FormControl();
    statusId = new FormControl('', [requiredField]);
    statusName = new FormControl('', [requiredField]);
    dueInDays = new FormControl();
    debtLoad = new FormControl();
    paymentTermId = new FormControl('');
    paymentTermName = new FormControl('');
    staffInChargeId = new FormControl();
    staffInChargeName = new FormControl();
    businessGroupId = new FormControl();

    supplierContacts = new FormArray([]);
    supplierBankAccounts = new FormArray([]);


    constructor(supplierDetailEntity?: LegalItemDetailEntity) {
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