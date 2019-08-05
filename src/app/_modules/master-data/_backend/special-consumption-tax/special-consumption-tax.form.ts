import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { SpecialConsumptionTaxEntity } from 'src/app/_modules/master-data/_backend/special-consumption-tax/special-consumption-tax.entity';
import { checkLength, requiredField } from 'src/app/_helpers';

export class SpecialConsumptionTaxForm extends FormModel {

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
  });

  constructor(specialConsumptionTaxEntity?: SpecialConsumptionTaxEntity) {
    super();
    if (specialConsumptionTaxEntity !== null && specialConsumptionTaxEntity !== undefined) {
      Object.keys(specialConsumptionTaxEntity).forEach((item) => {
        if (specialConsumptionTaxEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(specialConsumptionTaxEntity[item]);
        }
      });
    }
  }
}
