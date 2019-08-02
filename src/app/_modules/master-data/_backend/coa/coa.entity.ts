import { Entity } from 'src/app/_helpers/entity';

export class CoaEntity extends Entity {
  // sobEntity:
  setOfBookId: string;

  accountCode: string;
  accountName: string;
  accountDescription: string;

  characteristicId: string;
  characteristicValue: string;

  parentId: string;
  parentAccountCode: string;

  disabled: boolean;

  constructor(entity?: any) {
    super(entity);
  }
}
