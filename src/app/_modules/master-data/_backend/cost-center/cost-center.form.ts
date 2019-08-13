import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { CostCenterEntity } from 'src/app/_modules/master-data/_backend/cost-center/cost-center.entity';
import { checkLength, requiredField } from 'src/app/_helpers';

export class CostCenterForm extends FormModel {

  setOfBookId = new FormControl(null, [requiredField]);

  name = new FormControl(null, [requiredField]);
  code = new FormControl(null, [requiredField]);

  validFrom = new FormControl(null);
  validTo = new FormControl(null);

  chartOfAccountName = new FormControl(null);

  chartOfAccountId = new FormControl(null);

  description = new FormControl(null);

  errors: FormGroup = new FormGroup({});

  constructor(costCenterEntity?: CostCenterEntity) {
    super();
    if (costCenterEntity !== null && costCenterEntity !== undefined) {
      Object.keys(costCenterEntity).forEach((item) => {
        if (costCenterEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(costCenterEntity[item]);
        }
      });
    }
  }
}
