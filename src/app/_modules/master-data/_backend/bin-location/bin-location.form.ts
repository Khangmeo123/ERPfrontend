import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredField } from '../../../../_helpers';
import { BinLocationEntity } from './bin-location.entity';

export class BinLocationForm extends FormModel {
  id: FormControl = new FormControl();

  code: FormControl = new FormControl(null, [
    requiredField,
  ]);

  name: FormControl = new FormControl(null, [
    requiredField,
  ]);

  errors: FormGroup = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
  });

  constructor(entity?: BinLocationEntity) {
    super();
    this.mapData(entity);
  }
}
