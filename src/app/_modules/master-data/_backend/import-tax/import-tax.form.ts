import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { ImportTaxEntity } from 'src/app/_modules/master-data/_backend/import-tax/import-tax.entity';
import { checkLength, requiredField } from 'src/app/_helpers';
import { SpecialConsumptionTaxEntity } from '../special-consumption-tax/special-consumption-tax.entity';

export class ImportTaxForm extends FormModel {

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

  constructor(importTaxEntity?: SpecialConsumptionTaxEntity) {
    super();
    if (importTaxEntity !== null && importTaxEntity !== undefined) {
      Object.keys(importTaxEntity).forEach((item) => {
        if (importTaxEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(importTaxEntity[item]);
        }
      });
    }
  }
}
