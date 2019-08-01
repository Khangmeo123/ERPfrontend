import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredField } from 'src/app/_helpers';
import { FiscalYearEntity } from './fiscal-year.entity';

export class FiscalYearForm extends FormModel {
  setOfBookId = new FormControl(null, [requiredField]);

  name = new FormControl(null, [requiredField]);

  startDate = new FormControl(null, [requiredField]);
  endDate = new FormControl(null, [requiredField]);

  inventoryValuationMethod = new FormControl(null, [requiredField]);

  statusId = new FormControl(null);
  statusValue = new FormControl(null);

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
