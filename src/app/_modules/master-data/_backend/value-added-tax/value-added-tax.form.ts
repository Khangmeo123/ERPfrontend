import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, Validators, FormGroup, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { ValueAddedTaxEntity } from 'src/app/_modules/master-data/_backend/value-added-tax/value-added-tax.entity';
import { requiredField, checkLength } from 'src/app/_helpers';
import { SpecialConsumptionTaxEntity } from '../special-consumption-tax/special-consumption-tax.entity';

export class ValueAddedTaxForm extends FormModel {

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

  constructor(valueAddedTaxEntity?: SpecialConsumptionTaxEntity) {
    super();
    if (valueAddedTaxEntity !== null && valueAddedTaxEntity !== undefined) {
      Object.keys(valueAddedTaxEntity).forEach((item) => {
        if (valueAddedTaxEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(valueAddedTaxEntity[item]);
        }
      });
    }
  }
}
