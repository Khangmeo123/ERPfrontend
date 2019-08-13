import {FormControl, FormGroup} from '@angular/forms';
import {checkLength, requiredField} from 'src/app/_helpers';
import {LegalEntity} from './legal.entity';
import {FormModel} from 'src/app/_helpers/form-model';


export class LegalForm extends FormModel {
  name = new FormControl('', [requiredField, checkLength(1, 50)]);
  code = new FormControl('', [requiredField, checkLength(2, 2)]);
  setOfBookId = new FormControl();

  subLevel1: FormControl = new FormControl(null, [requiredField]);
  subLevel2: FormControl = new FormControl(null, [requiredField]);
  subLevel3: FormControl = new FormControl(null, [requiredField]);
  subLevel4: FormControl = new FormControl(null, [requiredField]);

  errors = new FormGroup({
    setOfBookId: new FormControl(),
    name: new FormControl(''),
    code: new FormControl(''),
  });

  constructor(legalEntity?: LegalEntity) {
    super();
    if (legalEntity !== null && legalEntity !== undefined) {
      Object.keys(legalEntity).forEach((item) => {
        if (legalEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].patchValue(legalEntity[item]);
        }
      });
    }
  }
}
