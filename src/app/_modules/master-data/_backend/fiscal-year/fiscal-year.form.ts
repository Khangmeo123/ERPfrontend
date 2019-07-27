import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredField } from 'src/app/_helpers';
import { FiscalYearEntity } from './fiscal-year.entity';

export class FiscalYearForm extends FormModel {

  setOfBookId = new FormControl(null, [requiredField]);

  name = new FormControl(null, [requiredField]);
  code = new FormControl(null, [requiredField]);

  formValid = new FormControl(null, [requiredField]);
  toValid = new FormControl(null, [requiredField]);

  valuationMethodId = new FormControl(null, [requiredField]);
  valuationMethodName = new FormControl(null, [requiredField]);

  statusId = new FormControl(null, [requiredField]);
  statusName = new FormControl(null, [requiredField]);

  errors = new FormGroup({});

  constructor(fiscalYearEntity?: FiscalYearEntity) {
    super();
    if (fiscalYearEntity !== null && fiscalYearEntity !== undefined) {
      Object.keys(fiscalYearEntity).forEach((item) => {
        if (fiscalYearEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(fiscalYearEntity[item]);
        }
      });
    }
  }
}
