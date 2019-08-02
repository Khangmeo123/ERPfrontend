import { Entity } from 'src/app/_helpers/entity';

export class CoaEntity extends Entity {
  // sobEntity:
  setOfBookId: string;

  code: string;
  name: string;
  description: string;

  characteristicId: string;
  characteristicValue: string;

  parentId: string;
  parentAccountCode: string;

  disabled: boolean;

  constructor(entity?: any) {
    super(entity);
  }
}
