import { Entity } from '../../../../_helpers/entity';

export class ChartOfAccountEntity extends Entity {
  id: string;

  accountCode: string;
  aliasCode: string;
  accountName: string;
  accountDescription: string;

  constructor(coaEntity?: any) {
    super(coaEntity);
  }
}
