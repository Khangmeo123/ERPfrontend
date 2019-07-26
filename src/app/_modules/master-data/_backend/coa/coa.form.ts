import { FormModel } from '../../../../_helpers/form-model';
import { FormControl } from '@angular/forms';
import { CoaEntity } from 'src/app/_modules/master-data/_backend/coa/coa.entity';
import { requiredField } from 'src/app/_helpers';

export class CoaForm extends FormModel {
  setOfBookId = new FormControl('');

  accountNumber = new FormControl('', [requiredField]);
  accountName = new FormControl('', [requiredField]);


  characteristicId = new FormControl('');
  characteristicName = new FormControl('');


  parentAccountId = new FormControl('');
  parentAccountNumber = new FormControl('');

  description = new FormControl('');

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
