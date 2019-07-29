import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountingPeriodEntity } from './accounting-period.entity';
import { requiredField } from 'src/app/_helpers';

export class AccountingPeriodForm extends FormModel {
  setOfBookId = new FormControl(null, [requiredField]);
  fiscalYearId = new FormControl(null, [requiredField]);

  validFrom = new FormControl(null, [requiredField]);
  validTo = new FormControl(null, [requiredField]);

  description = new FormControl(null);

  errors: FormGroup = new FormGroup({});

  constructor(accountingPeriodEntity?: AccountingPeriodEntity) {
    super();
    if (accountingPeriodEntity !== null && accountingPeriodEntity !== undefined) {
      Object.keys(accountingPeriodEntity).forEach((item) => {
        if (accountingPeriodEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(accountingPeriodEntity[item]);
        }
      });
    }
  }
}
