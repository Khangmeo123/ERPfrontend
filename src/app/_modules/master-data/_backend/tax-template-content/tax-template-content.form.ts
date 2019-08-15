import {FormControl, FormGroup} from '@angular/forms';
import {requiredField} from 'src/app/_helpers';
import {FormModel} from '../../../../_helpers/form-model';
import {TaxTemplateContentEntity} from './tax-template-content.entity';

export class TaxTemplateContentForm extends FormModel {

  id: FormControl = new FormControl(null);

  code = new FormControl(null, [requiredField]);

  name = new FormControl(null, [requiredField]);

  unitOfMeasureId = new FormControl(null);
  unitOfMeasureName = new FormControl(null);

  parentId = new FormControl(null);
  parentCode = new FormControl(null);
  parentName = new FormControl(null);

  rate = new FormControl(null);

  discount: FormControl = new FormControl(null);

  description = new FormControl(null);

  errors: FormGroup = new FormGroup({
    code: new FormControl(null),
    name: new FormControl(null),
    typeId: new FormControl(null),
  });

  constructor(taxTemplateDetailEntity?: TaxTemplateContentEntity) {
    super();
    if (taxTemplateDetailEntity !== null && taxTemplateDetailEntity !== undefined) {
      Object.keys(taxTemplateDetailEntity).forEach((item) => {
        if (taxTemplateDetailEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(taxTemplateDetailEntity[item]);
        }
      });
    }
  }
}
