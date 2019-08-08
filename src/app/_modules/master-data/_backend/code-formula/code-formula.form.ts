import { FormModel } from '../../../../_helpers/form-model';
import { CodeFormulaEntity } from './code-formula.entity';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredField } from '../../../../_helpers';

export class CodeFormulaForm extends FormModel {
  id: FormControl = new FormControl();

  code: FormControl = new FormControl({}, [
    requiredField,
  ]);

  name: FormControl = new FormControl({}, [
    requiredField,
  ]);

  description: FormControl = new FormControl();

  errors: FormGroup = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
  });

  constructor(entity?: CodeFormulaEntity) {
    super();
    this.mapData(entity);
  }
}
