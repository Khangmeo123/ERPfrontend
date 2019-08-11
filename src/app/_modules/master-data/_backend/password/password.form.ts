import { FormModel } from '../../../../_helpers/form-model';
import { PasswordEntity } from './password.entity';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredField } from '../../../../_helpers';

export class PasswordForm extends FormModel {
  id: FormControl = new FormControl(null, [
    requiredField,
  ]);

  password: FormControl = new FormControl(null, [
    requiredField,
  ]);

  errors: FormGroup = new FormGroup({
    id: new FormControl(null),
    password: new FormControl(null),
  });

  constructor(entity?: PasswordEntity) {
    super();
    if (entity !== null && entity !== undefined) {
      Object.keys(entity).forEach((item) => {
        if (entity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(entity[item]);
        }
      });
    }
  }
}
