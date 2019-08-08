import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { BankAccountEntity } from 'src/app/_modules/master-data/_backend/bank-account/bank-account.entity';
import { requiredField } from 'src/app/_helpers';

export class BankAccountForm extends FormModel {
  setOfBookId = new FormControl(null);

  chartOfAccountId = new FormControl(null, [requiredField]);
  chartOfAccountCode = new FormControl(null);
  chartOfAccountName = new FormControl(null);

  bankId = new FormControl(null, [requiredField]);
  bankCode = new FormControl(null);
  bankName = new FormControl(null);

  no = new FormControl(null, [requiredField]);
  name = new FormControl(null, [requiredField]);

  description = new FormControl(null);

  errors: FormGroup = new FormGroup({
    chartOfAccountId: new FormControl(),
    bankId: new FormControl(),
    no: new FormControl(),
    name: new FormControl(),
  });

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
