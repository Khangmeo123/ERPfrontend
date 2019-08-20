import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredField } from 'src/app/_helpers';
import { FiscalYearEntity } from './fiscal-year.entity';

export class FiscalYearForm extends FormModel {
  setOfBookId = new FormControl(null, [requiredField]);

  name = new FormControl(null, [requiredField]);

  startDate = new FormControl(null, [requiredField]);
  endDate = new FormControl(null, [requiredField]);

  valuationMethodId = new FormControl(null, [requiredField]);
  valuationMethodDisplay = new FormControl(null);

  statusId = new FormControl(null);
  statusDisplay = new FormControl(null);

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
