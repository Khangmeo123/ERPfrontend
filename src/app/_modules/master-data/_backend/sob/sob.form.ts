import { FormModel } from '../../../../_helpers/form-model';
import { FormControl } from '@angular/forms';
import { SobEntity } from 'src/app/_modules/master-data/_backend/sob/sob.entity';
import { requiredField } from 'src/app/_helpers';

export class SobForm extends FormModel {
  code = new FormControl('', [requiredField]);
  name = new FormControl('', [requiredField]);

  coaId = new FormControl('');
  coaName = new FormControl('');

  currencyId = new FormControl('', [requiredField]);
  currencyName = new FormControl('', [requiredField]);

  sctId = new FormControl('');
  sctName = new FormControl('');

  vatId = new FormControl('');
  vatName = new FormControl('');

  nrtId = new FormControl('');
  nrtName = new FormControl('');

  entId = new FormControl('');
  entName = new FormControl('');

  extId = new FormControl('');
  extName = new FormControl('');

  imtId = new FormControl('');
  imtName = new FormControl('');

  constructor(sobEntity?: SobEntity) {
    super();
    if (sobEntity !== null && sobEntity !== undefined) {
      Object.keys(sobEntity).forEach((item) => {
        if (sobEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(sobEntity[item]);
        }
      });
    }
  }
}
