import {FormModel} from '../../../../_helpers/form-model';
import {FormControl, FormGroup} from '@angular/forms';
import {requiredField} from '../../../../_helpers';
import {ProvinceEntity} from './province.entity';

export class ProvinceForm extends FormModel {
  id: FormControl = new FormControl(null);

  code: FormControl = new FormControl(null, [requiredField]);

  name: FormControl = new FormControl(null, [requiredField]);

  errors: FormGroup = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
  });

  constructor(entity?: ProvinceEntity) {
    super();
    this.mapData(entity);
  }
}
