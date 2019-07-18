import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { BankAccountEntity } from 'src/app/_modules/master-data/_backend/bank-account/bank-account.entity';
import { requiredField, checkLength } from 'src/app/_helpers';

export class SobForm extends FormModel {
    coaId = new FormControl('', [requiredField]);
    coaCode = new FormControl('', [requiredField]);
    coaName = new FormControl('', [requiredField]);

    bankId = new FormControl('', [requiredField]);
    bankCode = new FormControl('', [requiredField]);
    bankName = new FormControl('', [requiredField]);

    accountNumber = new FormControl('', [requiredField]);

    accountName = new FormControl('', [requiredField]);

    description = new FormControl('');

    constructor(bankAccountEntity?: BankAccountEntity) {
        super();
        if (bankAccountEntity !== null && bankAccountEntity !== undefined) {
            Object.keys(bankAccountEntity).forEach((item) => {
                if (bankAccountEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(bankAccountEntity[item]);
                }
            });
        }
    }
}