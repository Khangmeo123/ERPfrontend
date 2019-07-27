import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/_helpers/form-model';
import { requiredField } from 'src/app/_helpers';
import { CustomerDetailOfLegalEntity } from './legal-customer-detail.entity';

export class CustomerDetailOfLegalForm extends FormModel {
    code = new FormControl({ value: '', disabled: true }, [requiredField]);
    name = new FormControl({ value: '', disabled: true }, [requiredField]);
    taxCode = new FormControl({ value: '', disabled: true });
    note = new FormControl({ value: '', disabled: true });
    status = new FormControl({ value: '', disabled: true }, [requiredField]);
    dueInDays = new FormControl();
    debtLoad = new FormControl();
    paymentTermId = new FormControl('');
    paymentTermName = new FormControl('');
    staffInChargeId = new FormControl();
    staffInChargeName = new FormControl();
    businessGroupId = new FormControl();

    customerContacts = new FormArray([]);
    customerBankAccounts = new FormArray([]);

    errors = new FormGroup({
        name: new FormControl(''),
        code: new FormControl(''),
        status: new FormControl('')
    });


    constructor(customerDetailEntity?: CustomerDetailOfLegalEntity) {
        super();
        if (customerDetailEntity !== null && customerDetailEntity !== undefined) {
            Object.keys(customerDetailEntity).forEach((item) => {
                if (customerDetailEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(customerDetailEntity[item]);
                }
            });
        }
    }
}