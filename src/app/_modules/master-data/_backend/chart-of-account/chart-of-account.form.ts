import { FormModel } from '../../../../_helpers/form-model';
import { CoaEntity } from '../coa/coa.entity';

export class ChartOfAccountForm extends FormModel {
  constructor(coaEntity?: CoaEntity) {
    super();
    if (coaEntity !== null && coaEntity !== undefined) {
      Object.keys(coaEntity).forEach((item) => {
        if (coaEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(coaEntity[item]);
        }
      });
    }
  }
}
