import { Entity } from '../../../../_helpers/entity';

export class HrOrganizationEntity extends Entity {
  legalEntityId: string;
  legalEntityCode: string;
  legalEntityName: string;

  divisionId: string;
  divisionCode: string;
  divisionName: string;

  id: string;
  code: string;
  name: string;
  disabled: boolean;
  isValidated: boolean;

  errors: {
    [key: string]: any;
  };

  constructor(departmentEntity?: any) {
    super(departmentEntity);
  }
}
