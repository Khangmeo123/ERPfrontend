import { Entity } from '../../../../_helpers/entity';

export class DepartmentEntity extends Entity {
  legalEntityId: string;

  code: string;

  name: string;

  divisionId: string;
  divisionCode: string;
  divisionName: string;

  disabled: boolean;

  isValidated: boolean;

  errors: {
    [key: string]: any;
  };

  constructor(departmentEntity?: any) {
    super(departmentEntity);
  }
}
