import { FormModel } from '../../../../_helpers/form-model';
import { FormControl } from '@angular/forms';
import { BankAccountEntity } from 'src/app/_modules/master-data/_backend/bank-account/bank-account.entity';
import { requiredField } from 'src/app/_helpers';

export class BankAccountForm extends FormModel {
  setOfBookId = new FormControl(null);

  chartOfAccountId = new FormControl(null, [requiredField]);
  chartOfAccountCode = new FormControl(null, [requiredField]);
  chartOfAccountName = new FormControl(null, [requiredField]);

  bankId = new FormControl(null, [requiredField]);
  bankCode = new FormControl(null, [requiredField]);
  bankName = new FormControl(null, [requiredField]);

  accountNumber = new FormControl(null, [requiredField]);
  name = new FormControl(null, [requiredField]);
  accountOwner = new FormControl(null, [requiredField]);
  accountingCode = new FormControl(null, [requiredField]);

  description = new FormControl(null);

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
