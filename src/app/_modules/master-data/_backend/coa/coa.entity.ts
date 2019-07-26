import { Entity } from 'src/app/_helpers/entity';

export class CoaEntity extends Entity {
  // sobEntity:
  setOfBookId: string;

  accountCode: string = null;
  accountName: string = null;
  accountDescription: string;

  characteristicId: string = null;
  characteristicValue: string = null;

  parentId: string = null;
  parentAccountCode: string = null;

  disabled: boolean;

  constructor(coaEntity?: any) {
    super(coaEntity);
  }
}
