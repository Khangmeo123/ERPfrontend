import { FormModel } from 'src/app/_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredField } from 'src/app/_helpers';
import { BankAccountOfLegalEntity } from './bank-account-of-legal-entity.entity';

export class BankAccountOfLegalForm extends FormModel {

    name = new FormControl('');
    bankId = new FormControl('', [requiredField]);
    bankName = new FormControl('');
    accountNumber = new FormControl('', [requiredField]);
    accountName = new FormControl('', [requiredField]);
    branch = new FormControl('');
    provinceId = new FormControl('', [requiredField]);
    provinceName = new FormControl('');
    address = new FormControl('');

    errors = new FormGroup({
        provinceId: new FormControl(''),
        bankId: new FormControl(''),
        accountName: new FormControl(''),
        accountNumber: new FormControl('')
    });

    constructor(bankAccountOfLegalEntity?: BankAccountOfLegalEntity) {
        super();
        if (bankAccountOfLegalEntity !== null && bankAccountOfLegalEntity !== undefined) {
            Object.keys(bankAccountOfLegalEntity).forEach((item) => {
                if (bankAccountOfLegalEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
                    this[item].setValue(bankAccountOfLegalEntity[item]);
                }
            });
        }
    }
}
