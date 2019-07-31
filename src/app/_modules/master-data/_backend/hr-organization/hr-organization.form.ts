import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { requiredField } from '../../../../_helpers';
import { HrOrganizationEntity } from './hr-organization.entity';

export class HrOrganizationForm extends FormModel {
  legalEntityId: FormControl = new FormControl(null, [
    requiredField,
  ]);

  code: FormControl = new FormControl(null, [
    requiredField,
  ]);

  name: FormControl = new FormControl(null, [
    requiredField,
  ]);

  divisionId: FormControl = new FormControl(null, [
    requiredField,
  ]);

  errors: FormGroup = new FormGroup({});

  constructor(departmentEntity?: HrOrganizationEntity) {
    super();
    if (departmentEntity !== null && departmentEntity !== undefined) {
      Object.keys(departmentEntity).forEach((item) => {
        if (departmentEntity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          this[item].setValue(departmentEntity[item]);
        }
      });
    }
  }
}
