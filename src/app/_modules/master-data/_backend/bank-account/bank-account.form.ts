import { FormModel } from '../../../../_helpers/form-model';
import { FormControl } from '@angular/forms';
import { BankAccountEntity } from 'src/app/_modules/master-data/_backend/bank-account/bank-account.entity';
import { requiredField } from 'src/app/_helpers';

export class BankAccountForm extends FormModel {
  setOfBookId = new FormControl('');

  chartOfAccountId = new FormControl('', [requiredField]);
  chartOfAccountCode = new FormControl('', [requiredField]);
  chartOfAccountName = new FormControl('', [requiredField]);

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
