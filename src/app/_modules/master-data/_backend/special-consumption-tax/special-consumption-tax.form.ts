import { FormModel } from '../../../../_helpers/form-model';
import { FormControl } from '@angular/forms';
import { SpecialConsumptionTaxEntity } from 'src/app/_modules/master-data/_backend/special-consumption-tax/special-consumption-tax.entity';
import { requiredField } from 'src/app/_helpers';

export class SpecialConsumptionTaxForm extends FormModel {

  setOfBookId = new FormControl('', [requiredField]);

  code = new FormControl('', [requiredField]);

  name = new FormControl('', [requiredField]);

  unitOfMeasureId = new FormControl('');
  unitOfMeasureName = new FormControl('');

  chartOfAccountId = new FormControl('');
  chartOfAccountName = new FormControl('');

  rate = new FormControl('');
  description = new FormControl('');

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
