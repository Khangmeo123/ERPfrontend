import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { SpecialConsumptionTaxEntity } from 'src/app/_modules/master-data/_backend/special-consumption-tax/special-consumption-tax.entity';
import { requiredField } from 'src/app/_helpers';

export class SpecialConsumptionTaxForm extends FormModel {

  setOfBookId = new FormControl(null, [requiredField]);

  code = new FormControl(null, [requiredField]);

  name = new FormControl(null, [requiredField]);

  unitOfMeasureId = new FormControl(null);
  unitOfMeasureName = new FormControl(null);

  chartOfAccountId = new FormControl(null);
  chartOfAccountName = new FormControl(null);

  rate = new FormControl(null);
  description = new FormControl(null);

  errors: FormGroup = new FormGroup({});

  constructor(exciseTariffEntity?: SpecialConsumptionTaxEntity) {
    super();
    if (exciseTariffEntity !== null && exciseTariffEntity !== undefined) {
      Object.keys(exciseTariffEntity).forEach((item) => {
        if (exciseTariffEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(exciseTariffEntity[item]);
        }
      });
    }
  }
}
