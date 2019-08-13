import {FormModel} from '../../../../_helpers/form-model';
import {FormControl, FormGroup} from '@angular/forms';
import {requiredField} from '../../../../_helpers';
import {TaxTemplateEntity} from './tax-template.entity';

export class TaxTemplateForm extends FormModel {
  id: FormControl = new FormControl(null);

  typeId: FormControl = new FormControl(null, [
    requiredField,
  ]);

  typeDisplay: FormControl = new FormControl(null);

  code: FormControl = new FormControl(null, [
    requiredField,
  ]);

  name: FormControl = new FormControl(null, [
    requiredField,
  ]);

  errors: FormGroup = new FormGroup({
    code: new FormControl(null),
    name: new FormControl(null),
  });

  constructor(taxTemplateEntity?: TaxTemplateEntity) {
    super();
    this.mapData(taxTemplateEntity);
  }
}
