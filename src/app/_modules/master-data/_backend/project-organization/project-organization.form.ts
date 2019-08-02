import { FormModel } from '../../../../_helpers/form-model';
import { FormControl, FormGroup } from '@angular/forms';
import { checkLength, requiredField } from '../../../../_helpers';
import { ProjectOrganizationEntity } from './project-organization.entity';

export class ProjectOrganizationForm extends FormModel {
  legalEntityId: FormControl = new FormControl(null, [
    requiredField,
  ]);

  code: FormControl = new FormControl(null, [
    requiredField,
    checkLength(3, 3),
  ]);

  name: FormControl = new FormControl(null, [
    requiredField,
  ]);

  description: FormControl = new FormControl(null);

  divisionId: FormControl = new FormControl(null, [
    requiredField,
  ]);

  managerId: FormControl = new FormControl(null, [
    requiredField,
  ]);

  startDate: FormControl = new FormControl(null);

  endDate: FormControl = new FormControl(null);

  errors: FormGroup = new FormGroup({});

  constructor(departmentEntity?: ProjectOrganizationEntity) {
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
