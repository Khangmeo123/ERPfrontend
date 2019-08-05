import { Entity } from '../../../../_helpers/entity';

export class ChartOfAccountEntity extends Entity {
  id: string;

  code: string;
  aliasCode: string;
  name: string;
  description: string;

  constructor(coaEntity?: any) {
    super(coaEntity);
  }
}
