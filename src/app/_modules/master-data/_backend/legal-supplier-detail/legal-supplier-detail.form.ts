import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/_helpers/form-model';
import { LegalSupplierDetailEntity } from './legal-supplier-detail.entity';

export class SupplierDetailForm extends FormModel {
    code = new FormControl({ value: '', disabled: true });
    name = new FormControl({ value: '', disabled: true });
    taxCode = new FormControl({ value: '', disabled: true });
    note = new FormControl({ value: '', disabled: true });
    status = new FormControl({ value: '', disabled: true });
    dueInDays = new FormControl();
    debtLoad = new FormControl();
    paymentTermId = new FormControl('');
    paymentTermName = new FormControl('');
    staffInChargeId = new FormControl('');
    staffInChargeName = new FormControl('');
    supplierGroupingName = new FormControl({ value: '', disabled: true });

    supplierContacts = new FormArray([]);
    supplierBankAccounts = new FormArray([]);

    errors = new FormGroup({
        name: new FormControl(''),
        code: new FormControl(''),
        status: new FormControl('')
    });


    constructor(supplierDetailEntity?: LegalSupplierDetailEntity) {
        super();
        if (supplierDetailEntity !== null && supplierDetailEntity !== undefined) {
            Object.keys(supplierDetailEntity).forEach((item) => {
                if (supplierDetailEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    if (supplierDetailEntity[item] && typeof supplierDetailEntity[item] === 'object'
                        && supplierDetailEntity[item].constructor === Array) {
                        supplierDetailEntity[item].forEach(r => {
                            const formGroup = new FormGroup({});
                            Object.keys(r).forEach((result) => {
                                formGroup.addControl(result, new FormControl(r[result]));
                            });
                            this[item].push(formGroup);
                        })
                    } else {
                        this[item].setValue(supplierDetailEntity[item]);
                    }
                }
            });
        }
    }
}

