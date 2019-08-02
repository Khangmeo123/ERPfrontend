import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { SobEntity } from 'src/app/_modules/master-data/_backend/sob/sob.entity';
import { checkLength, requiredField } from 'src/app/_helpers';

export class SobForm extends FormModel {
  id = new FormControl(null, [requiredField]);
  code = new FormControl(null, [requiredField, checkLength(2, 2)]);
  name = new FormControl(null, [requiredField, checkLength(3, 50)]);

  chartOfAccountTemplateId = new FormControl(null);
  chartOfAccountTemplateName = new FormControl(null);

  currencyId = new FormControl(null, [requiredField]);
  currencyCode = new FormControl(null, []);

  specialConsumptionTaxTemplateId = new FormControl(null);
  specialConsumptionTaxTemplateName = new FormControl(null);

  valueAddedTaxTemplateId = new FormControl(null);
  valueAddedTaxTemplateName = new FormControl(null);

  naturalResourceTaxTemplateId = new FormControl(null);
  naturalResourceTaxTemplateName = new FormControl(null);

  environmentTaxTemplateId = new FormControl(null);
  environmentTaxTemplateName = new FormControl(null);

  exportTaxTemplateId = new FormControl(null);
  exportTaxTemplateName = new FormControl(null);

  importTaxTemplateId = new FormControl(null);
  importTaxTemplateName = new FormControl(null);

  errors = new FormGroup({});

  constructor(sobEntity?: SobEntity) {
    super();
    if (sobEntity !== null && sobEntity !== undefined) {
      Object.keys(sobEntity).forEach((item) => {
        if (sobEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(sobEntity[item]);
        }
      });
    }
  }
}
