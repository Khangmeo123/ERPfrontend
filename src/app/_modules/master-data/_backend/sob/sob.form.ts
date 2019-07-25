import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { SobEntity } from 'src/app/_modules/master-data/_backend/sob/sob.entity';
import { checkLength, requiredField } from 'src/app/_helpers';

export class SobForm extends FormModel {
  code = new FormControl('', [requiredField, checkLength(1, 2)]);
  name = new FormControl('', [requiredField]);

  chartOfAccountTemplateId = new FormControl('');
  chartOfAccountTemplateName = new FormControl('');

  currencyId = new FormControl('', [requiredField]);
  currencyCode = new FormControl('', []);

  specialConsumptionTaxTemplateId = new FormControl('');
  specialConsumptionTaxTemplateName = new FormControl('');

  valueAddedTaxTemplateId = new FormControl('');
  valueAddedTaxTemplateName = new FormControl('');

  naturalResourceTaxTemplateId = new FormControl('');
  naturalResourceTaxTemplateName = new FormControl('');

  environmentTaxTemplateId = new FormControl('');
  environmentTaxTemplateName = new FormControl('');

  exportTaxTemplateId = new FormControl('');
  exportTaxTemplateName = new FormControl('');

  importTaxTemplateId = new FormControl('');
  importTaxTemplateName = new FormControl('');

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
