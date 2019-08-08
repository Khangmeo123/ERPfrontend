import { FormModel } from './../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { checkLength, requiredField } from 'src/app/_helpers';
import { SpecialConsumptionTaxEntity } from '../special-consumption-tax/special-consumption-tax.entity';

export class NaturalResourceTaxForm extends FormModel {

  setOfBookId = new FormControl(null, [requiredField]);

  id: FormControl = new FormControl(null);

  code = new FormControl(null, [requiredField]);

  name = new FormControl(null, [requiredField, checkLength(3, 500)]);

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
  });

  constructor(naturalResourceTaxEntity?: SpecialConsumptionTaxEntity) {
    super();
    if (naturalResourceTaxEntity !== null && naturalResourceTaxEntity !== undefined) {
      Object.keys(naturalResourceTaxEntity).forEach((item) => {
        if (naturalResourceTaxEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(naturalResourceTaxEntity[item]);
        }
      });
    }
  }
}