import { FormModel } from '../../../../_helpers/form-model';
import { FormControl } from '@angular/forms';
import { CoaEntity } from 'src/app/_modules/master-data/_backend/coa/coa.entity';
import { requiredField } from 'src/app/_helpers';

export class CoaForm extends FormModel {
  setOfBookId = new FormControl(null);

  accountCode = new FormControl(null, [requiredField]);
  accountName = new FormControl(null, [requiredField]);
  accountDescription = new FormControl(null);

  characteristicId = new FormControl(null);
  characteristicValue = new FormControl(null);


  parentId = new FormControl(null);
  parentAccountCode = new FormControl(null);

  disabled = new FormControl(null);

  constructor(coaEntity?: CoaEntity) {
    super();
    if (coaEntity !== null && coaEntity !== undefined) {
      Object.keys(coaEntity).forEach((item) => {
        if (coaEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(coaEntity[item]);
        }
      });
    }
  }
}
