import { FormModel } from '../../../../_helpers/form-model';
import { FormControl } from '@angular/forms';
import { SobEntity } from 'src/app/_modules/master-data/_backend/sob/sob.entity';
import { requiredField } from 'src/app/_helpers';

export class SobForm extends FormModel {
  code = new FormControl('', [requiredField]);
  name = new FormControl('', [requiredField]);

  chartOfAccountTemplateId = new FormControl('');
  chartOfAccountTemplateName = new FormControl('');

  currencyId = new FormControl('', [requiredField]);
  currencyName = new FormControl('', [requiredField]);

  specialConsumptionTemplateId = new FormControl('');
  specialConsumptionTemplateName = new FormControl('');

  valueAddedTemplateId = new FormControl('');
  valueAddedTemplateName = new FormControl('');

  naturalResourceTemplateId = new FormControl('');
  naturalResourceTemplateName = new FormControl('');

  environmentTemplateId = new FormControl('');
  environmentTemplateName = new FormControl('');

  exportTemplateId = new FormControl('');
  exportTemplateName = new FormControl('');

  importTemplateId = new FormControl('');
  importTemplateName = new FormControl('');

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
